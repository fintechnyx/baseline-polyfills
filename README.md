# 🚀 Baseline Polyfill CDN+

**Empowering web developers to stay Baseline-compliant, lightweight, and future-ready.**

Baseline Polyfill CDN+ is a smart, automated polyfill service that dynamically serves only the polyfills you actually need — based on your target Baseline year (2024, 2025, 2026...).  
It helps modern web apps run seamlessly across browsers, without bloating bundles or slowing down performance.

🌐 **Live Deployment:** [https://baseline-polyfill.vercel.app](https://baseline-polyfill.vercel.app)

---

## 🧠 What Problem Does It Solve?

Web developers often face compatibility issues when using newer web APIs like `Intl.Segmenter`, `Promise.any`, or `fetch`.  
Existing polyfill bundles (like `core-js` or `polyfill.io`) usually **serve too much**, shipping unnecessary code to every user.

Baseline Polyfill CDN+ solves this by:
- Understanding which APIs are *Baseline-safe* for your target year.
- Serving *only* what’s missing.
- Letting you *test and visualize* polyfill behavior in a live dashboard.

---

## 🌟 Key Features

✅ **Smart Baseline Filtering**  
Detects which APIs need polyfills for a chosen target year.

✅ **Lightweight CDN Delivery**  
Fetches only the required scripts from trusted CDNs like `polyfill.io` and `core-js`.

✅ **Interactive Dashboard**  
Includes a built-in web interface to test Baseline support in real time.

✅ **Hackathon-Ready and Open Source**  
Fully deployable, open source, and designed to impress hackathon judges with real functionality.

---

## 🧩 Architecture

baseline-polyfill-cdn/
│
├── index.js # Node.js server with Express
├── dashboard.html # Visual dashboard for testing polyfills
├── demo.html # Live API test page
├── package.json # Dependencies and project metadata
├── README.md # Documentation (this file)
└── public/ # (Optional) Static assets and resources

yaml
Copy code

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | Node.js (Express) |
| **Frontend** | Vanilla HTML, JS, CSS |
| **Polyfills** | core-js, polyfill.io, whatwg-fetch |
| **Deployment** | Vercel |
| **Baseline Data** | Chrome/Baseline 2024–2026 web standard references |

---

## 🚀 How to Use (Live)

Visit the deployed service:  
👉 [https://baseline-polyfill.vercel.app](https://baseline-polyfill.vercel.app)

You can access:

- Dashboard → [https://baseline-polyfill.vercel.app/dashboard.html](https://baseline-polyfill.vercel.app/dashboard.html)  
- Demo Page → [https://baseline-polyfill.vercel.app/demo.html](https://baseline-polyfill.vercel.app/demo.html)

Or directly request polyfills via the API:

https://baseline-polyfill.vercel.app/polyfill.js?target=2024&features=fetch,promise-any,intl-segmenter

yaml
Copy code

The server automatically checks the **Baseline year** and serves only the polyfills needed.

---

## 🧭 How It Works

1. You define a target Baseline year (e.g., `2024`, `2025`, `2026`).
2. You specify the features you want polyfills for (e.g., `fetch`, `promise-any`).
3. The server:
   - Looks up if the feature is Baseline-safe.
   - Dynamically injects only the missing polyfills via trusted CDNs.
4. The frontend dashboard and demo pages show which APIs work, polyfilled or native.

---

## 🧪 Demo Output Example

On the demo page:

✅ Intl.Segmenter worked: Hello | world!
✅ Fetch worked: { "userId": 1, "id": 1, "title": "delectus aut autem" }
✅ Promise.any result: success!

yaml
Copy code

If the environment doesn’t support a feature, the corresponding polyfill is loaded instantly.

---

## 🌐 Live API Example

You can directly request only the polyfills you need:

```bash
curl "https://baseline-polyfill.vercel.app/polyfill.js?target=2025&features=fetch,promise-any"
Output:

js
Copy code
/* Polyfills applied for baseline 2025 */
importScripts("https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.min.js");
importScripts("https://polyfill.io/v3/polyfill.min.js?features=Promise.any");
No excess payload. No unnecessary scripts.

🖥 Dashboard Preview
The dashboard provides:

Baseline year selector

Feature list with real-time polyfill status

Console logs for polyfill application

Link to live demos

🖱 Try it here: https://baseline-polyfill.vercel.app/dashboard.html

💡 Hackathon Edge
🔥 Why This Stands Out:

Baseline-aware polyfill engine (unique concept for 2025).

Practical demo — shows live API compatibility.

Optimized performance — loads only what’s missing.

Modern developer experience — deploys easily, extendable for future APIs.

It’s not just another polyfill CDN — it’s a Baseline intelligence layer for modern web compatibility.

🧑‍💻 Development (Local)
To run locally:

bash
Copy code
git clone https://github.com/fintechnyx/baseline-polyfills.git
cd baseline-polyfill-cdn
npm install
npm start
Then open:

arduino
Copy code
http://localhost:3000
📦 Deployment (Vercel)
Already live here: https://baseline-polyfill.vercel.app

To deploy your own fork:

Fork the repo.

Go to Vercel.

Import your GitHub repo.

Use settings:

Framework: Other

Build Command: npm install && npm start

Output Directory: .

Deploy.

👥 Team
NyxFintech Developer Team
Built with ❤️ for the Baseline Tooling Hackathon 2025

Lead Developer: Hritvik

Backend & Architecture: NyxFintech Labs

UI/UX Design: Avani

📜 License
MIT License © 2025 NyxFintech
Free for commercial and personal use.

🔗 Quick Links
Live Site: https://baseline-polyfill.vercel.app

Demo Page: https://baseline-polyfill.vercel.app/demo.html

Dashboard: https://baseline-polyfill.vercel.app/dashboard.html

GitHub Repository: https://github.com/fintechnyx/baseline-polyfills