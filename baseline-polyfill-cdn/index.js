import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// ✅ Serve static files correctly
app.use(express.static(__dirname));

const baselineData = {
  fetch: 2025,
  "intl-segmenter": 2026,
  "promise-any": 2025
};

function isBaselineSafe(featureId, targetYear) {
  return baselineData[featureId] && baselineData[featureId] <= targetYear;
}

function loadPolyfill(name) {
  const filePath = path.join(__dirname, "polyfills", `${name}.js`);
  if (fs.existsSync(filePath)) return fs.readFileSync(filePath, "utf-8");
  return "";
}

app.get("/polyfill.js", (req, res) => {
  const { target = "2024", features = "" } = req.query;
  const featureList = features.split(",").map(f => f.trim()).filter(Boolean);

  let output = "";
  featureList.forEach(f => {
    if (!isBaselineSafe(f, parseInt(target))) {
      output += `\n// Polyfill for ${f}\n${loadPolyfill(f)}\n`;
    }
  });

  res.set("Content-Type", "application/javascript");
  res.send(output || "// 🎉 No polyfills needed");
});

app.listen(PORT, () => {
  console.log(`🚀 Running at http://localhost:${PORT}`);
  console.log(`🌐 Open demo at http://localhost:3000/demo.html`);
});
