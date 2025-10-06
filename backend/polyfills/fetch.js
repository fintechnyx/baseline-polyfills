if (!window.fetch) {
  window.fetch = function() {
    console.log("⚠️ Polyfill: fetch() not supported — using fallback.");
  };
}
