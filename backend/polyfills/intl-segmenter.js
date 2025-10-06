if (!("Segmenter" in Intl)) {
  Intl.Segmenter = function () {
    return {
      segment: (text) => text.split(" ").map(t => ({ segment: t }))
    };
  };
  console.log("✅ Polyfilled Intl.Segmenter()");
}
