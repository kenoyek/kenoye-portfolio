import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4173";
const forcedTheme = process.env.QA_THEME;
const onlyRoute = process.env.QA_ROUTE;
const outputDir = path.resolve("docs/qa/screenshots");
const port = 9444 + Math.floor(Math.random() * 1000);

const routeSet = [
  { name: "home", path: "/" },
  { name: "asele", path: "/projects/asele" },
  { name: "teacheasy", path: "/projects/teacheasy" },
  { name: "reframe", path: "/projects/reframe" },
  { name: "blog", path: "/blog" },
  { name: "admin-login", path: "/admin/login" },
  { name: "invalid-project", path: "/projects/not-a-project" },
  { name: "unknown-route", path: "/unknown-route" },
];

const homeBreakpoints = [
  [320, 568],
  [375, 812],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080],
];

const routeBreakpoints = [
  [375, 812],
  [1440, 900],
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=/tmp/kenoye-chrome-qa-${port}`,
    `--remote-debugging-port=${port}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const connect = async () => {
  await wait(2500);
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: "PUT",
  }).then((res) => res.json());
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();

  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data.toString());
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  });

  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const nextId = ++id;
      pending.set(nextId, resolve);
      ws.send(JSON.stringify({ id: nextId, method, params }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  if (forcedTheme === "light" || forcedTheme === "dark") {
    await send("Page.addScriptToEvaluateOnNewDocument", {
      source: `localStorage.setItem("theme", ${JSON.stringify(forcedTheme)});`,
    });
  }
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });

  return { ws, send };
};

const capture = async ({ route, width, height, send }) => {
  const themeSuffix = forcedTheme ? `-${forcedTheme}` : "";
  const file = path.join(outputDir, `${route.name}-${width}x${height}${themeSuffix}.png`);
  const url = new URL(route.path, baseUrl).toString();

  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
  });
  await send("Page.navigate", { url });
  await wait(3500);

  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(file, Buffer.from(screenshot.result.data, "base64"));
  console.log(`Captured ${file}`);
};

try {
  await mkdir(outputDir, { recursive: true });
  const { ws, send } = await connect();

  const routes = onlyRoute ? routeSet.filter((route) => route.name === onlyRoute) : routeSet;

  for (const route of routes) {
    const breakpoints = route.name === "home" && !onlyRoute ? homeBreakpoints : routeBreakpoints;
    for (const [width, height] of breakpoints) {
      await capture({ route, width, height, send });
    }
  }

  ws.close();
  console.log(`Captured screenshots in ${outputDir}`);
} finally {
  chrome.kill();
}
