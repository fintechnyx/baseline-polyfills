import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Import only core-js features you want to serve as polyfills
import "core-js/features/array/flat-map.js";
import "core-js/features/object/from-entries.js";
import "core-js/features/string/replace-all.js";
import "core-js/features/promise/all-settled.js";
import "core-js/features/global-this.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Baseline data
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

// Helper
function isBaselineSafe(feature, targetYear) {
  return baselineData[feature] <= targetYear;
}

// Serve static files
app.use(express.static(__dirname));

// Polyfill route
app.get("/polyfill.js", (req, res) => {
  const target = parseInt(req.query.target, 10) || 2024;
  const features = (req.query.features || "")
    .split(",")
    .map(f => f.trim())
    .filter(Boolean);

  const polyfills = [];

  features.forEach(f => {
    if (!isBaselineSafe(f, target)) {
      // Core-js features
      switch (f) {
        case "array-flatmap":
          polyfills.push("/* array.flatMap polyfilled by core-js */");
          break;
        case "object-from-entries":
          polyfills.push("/* Object.fromEntries polyfilled by core-js */");
          break;
        case "string-replaceall":
          polyfills.push("/* String.prototype.replaceAll polyfilled by core-js */");
          break;
        case "promise-allsettled":
          polyfills.push("/* Promise.allSettled polyfilled by core-js */");
          break;
        case "globalThis":
          polyfills.push("/* globalThis polyfilled by core-js */");
          break;
        case "fetch":
          polyfills.push(`
            if (!window.fetch) {
              window.fetch = function(url, options) {
                return Promise.reject(new Error('fetch polyfill not implemented'));
              };
            }
          `);
          break;
        case "intl-segmenter":
          polyfills.push(`
            if (!('Segmenter' in Intl)) {
              Intl.Segmenter = class { constructor(){} segment(str){return [{segment:str}];} }
            }
          `);
          break;
        case "promise-any":
          polyfills.push(`
            if (!Promise.any) {
              Promise.any = function(promises){
                return new Promise((resolve,reject)=>{
                  let rejections=0;
                  promises.forEach(p=>Promise.resolve(p).then(resolve).catch(()=>{
                    rejections++;
                    if(rejections===promises.length) reject(new AggregateError([], 'All promises rejected'));
                  }));
                });
              }
            }
          `);
          break;
      }
    }
  });

  res.type("application/javascript");
  res.send(polyfills.join("\n"));
});

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Baseline Polyfill CDN+ running at http://localhost:${port}`);
});
