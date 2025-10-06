import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ------------------------------------
// Setup
// ------------------------------------
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------
// Baseline data
// ------------------------------------
const baselineData = {
  fetch: 2025,
  "intl-segmenter": 2026,
  "promise-any": 2025,
  "array-flatmap": 2024,
  "object-from-entries": 2024,
  "string-replaceall": 2025,
  "promise-allsettled": 2024,
  "globalThis": 2024,
  "weakref": 2027,
  "urlsearchparams": 2025
};

// ------------------------------------
// Helpers
// ------------------------------------
function isBaselineSafe(feature, targetYear) {
  return baselineData[feature] <= targetYear;
}

// ------------------------------------
// Serve frontend
// ------------------------------------
app.use(express.static(path.join(__dirname, "../frontend")));

// ------------------------------------
// Polyfill route (dynamic functional version)
// ------------------------------------
app.get("/polyfill.js", async (req, res) => {
  const target = parseInt(req.query.target, 10) || 2024;
  const features = (req.query.features || "")
    .split(",")
    .map(f => f.trim().toLowerCase())
    .filter(Boolean);

  const polyfillCDNs = {
    fetch: "https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.min.js",
    "promise-any": "https://polyfill.io/v3/polyfill.min.js?features=Promise.any",
    "promise-allsettled": "https://polyfill.io/v3/polyfill.min.js?features=Promise.allSettled",
    "array-flatmap": "https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.flatMap",
    "object-from-entries": "https://polyfill.io/v3/polyfill.min.js?features=Object.fromEntries",
    "string-replaceall": "https://polyfill.io/v3/polyfill.min.js?features=String.prototype.replaceAll",
    globalthis: "https://polyfill.io/v3/polyfill.min.js?features=globalThis",
    "intl-segmenter": "https://polyfill.io/v3/polyfill.min.js?features=Intl.Segmenter",
    urlsearchparams: "https://polyfill.io/v3/polyfill.min.js?features=URLSearchParams"
  };

  let polyfillScripts = [];

  for (const f of features) {
    if (!isBaselineSafe(f, target)) {
      const url = polyfillCDNs[f];
      if (url) {
        polyfillScripts.push(`importScripts("${url}");`);
      }
    }
  }

  const code = polyfillScripts.length
    ? `/* Polyfills applied for baseline ${target} */\n${polyfillScripts.join("\n")}`
    : "/* No polyfills needed for this baseline */";

  res.type("application/javascript");
  res.send(code);
});

// ------------------------------------
// Routes
// ------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

app.get("/demo.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/demo.html"));
});

// ------------------------------------
// Start server
// ------------------------------------
app.listen(port, () => {
  console.log(`🚀 Baseline Polyfill CDN+ running at http://localhost:${port}`);
});
