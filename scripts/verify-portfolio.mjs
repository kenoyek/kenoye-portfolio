/** Browser regression checks. Run against Vite or a production preview.
 * QA_BASE_URL=http://127.0.0.1:4173 node scripts/verify-portfolio.mjs
 * Uses installed Chromium and Node 24's WebSocket; no added dependencies.
 */
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:8080";
const out = process.env.QA_OUTPUT_DIR || "/tmp/kenoye-redesign-qa";
const profile = await mkdtemp(path.join(tmpdir(), "kenoye-qa-"));
const port = 9333;
const chrome = spawn(
  process.env.CHROME_PATH || "/usr/bin/chromium",
  [
    "--headless",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${port}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
const results = [];
const runtimeErrors = [];
try {
  let target;
  for (let n = 0; n < 50; n++) {
    try {
      target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" }).then(
        (r) => r.json(),
      );
      break;
    } catch {
      await pause(100);
    }
  }
  if (!target) throw Error("Chromium did not start");
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const m = JSON.parse(event.data);
    if (m.method === "Runtime.exceptionThrown") runtimeErrors.push(m.params.exceptionDetails.text);
    if (pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const key = ++id;
      const timer = setTimeout(() => {
        pending.delete(key);
        reject(Error(`CDP timeout: ${method}`));
      }, 15000);
      pending.set(key, (m) => {
        clearTimeout(timer);
        if (m.error) reject(Error(JSON.stringify(m.error)));
        else resolve(m.result);
      });
      socket.send(JSON.stringify({ id: key, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };
  const check = (condition, message) => {
    if (!condition) throw Error(message);
    results.push(message);
  };
  const waitFor = async (expression) => {
    for (let n = 0; n < 60; n++) {
      if (await evaluate(`Boolean(${expression})`)) return;
      await pause(100);
    }
    throw Error(`Not ready: ${expression}`);
  };
  const viewport = async (width, theme) => {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 960,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send("Emulation.setEmulatedMedia", {
      features: [
        { name: "prefers-color-scheme", value: theme },
        { name: "prefers-reduced-motion", value: "reduce" },
      ],
    });
  };
  const navigate = async (route) => {
    await send("Page.navigate", { url: `${base}${route}` });
    await waitFor('document.querySelector("h1")');
    await waitFor(
      '!document.querySelector(".site-header") || getComputedStyle(document.querySelector(".site-header")).position === "fixed"',
    );
    await evaluate("document.fonts.ready.then(() => true)");
    await pause(350);
  };
  const screenshot = async (name) => {
    const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(path.join(out, `${name}.png`), Buffer.from(r.data, "base64"));
  };
  await mkdir(out, { recursive: true });
  await send("Page.enable");
  await send("Runtime.enable");
  await viewport(1440, "dark");
  await navigate("/");
  await evaluate('localStorage.removeItem("theme")');
  for (const theme of ["dark", "light"]) {
    for (const width of [360, 390, 430, 768, 1024, 1440, 1920]) {
      await viewport(width, theme);
      await navigate("/");
      check(
        await evaluate(`document.documentElement.classList.contains(${JSON.stringify(theme)})`),
        `${width}px ${theme}: system theme respected`,
      );
      // Exercise every section, including viewport-triggered reveals and lazy images.
      await evaluate(
        "(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}window.scrollTo(0,0)})()",
      );
      check(
        await evaluate("document.documentElement.scrollWidth <= innerWidth"),
        `${width}px ${theme}: no horizontal overflow`,
      );
      check(
        await evaluate('document.querySelectorAll("h1").length === 1'),
        `${width}px ${theme}: one primary heading`,
      );
      check(
        await evaluate(
          '[...document.querySelectorAll("img")].filter(i=>i.complete && i.naturalWidth===0).length===0',
        ),
        `${width}px ${theme}: no broken loaded images`,
      );
      await pause(150);
      await screenshot(`home-${theme}-${width}`);
      if (width === 390 || width === 1440) {
        for (const section of ["work", "capabilities", "about", "contact"]) {
          await evaluate(`document.getElementById("${section}").scrollIntoView({block:"start"})`);
          await pause(150);
          await screenshot(`${section}-${theme}-${width}`);
        }
      }
    }
  }
  await viewport(390, "dark");
  await navigate("/");
  await evaluate('document.querySelector(".mobile-menu-trigger").click()');
  await waitFor('document.querySelector("[role=dialog]")');
  check(
    await evaluate('document.querySelector("[role=dialog]").contains(document.activeElement)'),
    "Mobile menu: focus enters dialog",
  );
  for (let n = 0; n < 12; n++)
    await send("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Tab",
      code: "Tab",
      windowsVirtualKeyCode: 9,
    });
  check(
    await evaluate('document.querySelector("[role=dialog]").contains(document.activeElement)'),
    "Mobile menu: Tab focus stays contained",
  );
  await screenshot("mobile-menu");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await pause(100);
  check(
    await evaluate(
      '!document.querySelector("[role=dialog]") && document.activeElement.classList.contains("mobile-menu-trigger")',
    ),
    "Mobile menu: Escape closes and restores focus",
  );
  await evaluate('document.querySelector(".mobile-menu-trigger").click()');
  await evaluate(
    '[...document.querySelectorAll(".mobile-nav-link")].find(a=>a.textContent.includes("Work")).click()',
  );
  await pause(300);
  check(
    await evaluate('!document.querySelector("[role=dialog]") && location.hash === "#work"'),
    "Mobile navigation: Work link closes dialog and navigates",
  );
  await viewport(1440, "dark");
  await navigate("/");
  check(
    await evaluate(
      `[...document.querySelectorAll('a[href^="#"]')].every(a => document.getElementById(a.hash.slice(1)))`,
    ),
    "Homepage: local anchor targets exist",
  );
  for (const slug of ["asele", "teacheasy", "reframe"]) {
    const root = `.product-${slug}`;
    await evaluate(`document.querySelector(${JSON.stringify(root + " [role=tab]")}).focus()`);
    await send("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "ArrowRight",
      code: "ArrowRight",
      windowsVirtualKeyCode: 39,
    });
    await pause(100);
    check(
      await evaluate(
        `document.querySelectorAll(${JSON.stringify(root + " [role=tab]")})[1].getAttribute("aria-selected")==="true"`,
      ),
      `${slug}: keyboard ArrowRight selects next product view`,
    );
    check(
      await evaluate(
        `document.querySelector(${JSON.stringify(root + " [role=tabpanel][data-state=active] img")}).getAttribute("src")`,
      ),
      `${slug}: selected view contains real image`,
    );
    await evaluate(
      `document.querySelector(${JSON.stringify(root)}).scrollIntoView({block:"center"})`,
    );
    await pause(200);
    await screenshot(`product-${slug}`);
  }
  for (const width of [390, 1440]) {
    await viewport(width, "dark");
    for (const slug of ["asele", "teacheasy", "reframe"]) {
      const heights = await evaluate(
        `(async()=>{const root=document.querySelector('.product-${slug}'); const sizes=[]; for(const tab of root.querySelectorAll('[role=tab]')){tab.focus();await new Promise(r=>setTimeout(r,60));sizes.push(root.getBoundingClientRect().height)}return sizes})()`,
      );
      check(
        Math.max(...heights) - Math.min(...heights) < 2,
        `${slug} ${width}px: all product views preserve layout height (${heights.join(", ")})`,
      );
    }
  }
  await viewport(1440, "dark");
  await evaluate(
    'window.scrollTo(0,0);document.querySelector("button[aria-label^=Switch]").click()',
  );
  await pause(100);
  check(
    await evaluate(
      'document.documentElement.classList.contains("light") && localStorage.getItem("theme")==="light"',
    ),
    "Theme toggle: light preference persisted",
  );
  await navigate("/");
  check(
    await evaluate('document.documentElement.classList.contains("light")'),
    "Theme preference survives navigation/reload",
  );
  await evaluate('localStorage.removeItem("theme")');
  for (const route of [
    "/projects/asele",
    "/projects/teacheasy",
    "/projects/reframe",
    "/blog",
    "/admin/login",
    "/projects/not-a-project",
    "/unknown-route",
  ]) {
    for (const theme of ["dark", "light"]) {
      await viewport(390, theme);
      await navigate(route);
      check(
        await evaluate("document.documentElement.scrollWidth<=innerWidth"),
        `${route} ${theme}: mobile route renders without overflow`,
      );
      await screenshot(`${route.replaceAll("/", "-").slice(1)}-${theme}`);
    }
  }
  check(runtimeErrors.length === 0, `No uncaught browser exceptions (${runtimeErrors.length})`);

  await writeFile(path.join(out, "results.json"), JSON.stringify(results, null, 2));
  console.log(`PASS: ${results.length} browser assertions; screenshots and results: ${out}`);
} finally {
  socket?.close();
  chrome.kill("SIGTERM");
  await pause(200);
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
