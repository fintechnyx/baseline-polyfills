if (!window.fetch) {
  window.fetch = function (url, options) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options?.method || "GET", url);
      xhr.onload = () => resolve({ text: () => Promise.resolve(xhr.responseText) });
      xhr.onerror = reject;
      xhr.send(options?.body || null);
    });
  };
}
