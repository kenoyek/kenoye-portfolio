import { spawn } from "node:child_process";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.argv[2] || "http://127.0.0.1:4173/";
const width = Number(process.argv[3] || 320);
const height = Number(process.argv[4] || 568);
const port = 9333 + Math.floor(Math.random() * 1000);
const userDataDir = `/tmp/kenoye-chrome-overflow-${port}`;

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  await wait(2500);
  const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, {
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
  await wait(3000);

  const result = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const viewport = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const offenders = [...document.querySelectorAll("body *")]
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            className: String(el.className || ""),
            text: (el.textContent || "").trim().slice(0, 80),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
          };
        })
        .filter((item) => item.right > viewport + 1 || item.left < -1 || item.width > viewport + 1)
        .sort((a, b) => b.right - a.right)
        .slice(0, 20);
      return { viewport, scrollWidth, offenders };
    })()`,
  });

  console.log(JSON.stringify(result.result.result.value, null, 2));
  ws.close();
} finally {
  chrome.kill();
}
