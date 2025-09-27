if (!("Segmenter" in Intl)) {
  Intl.Segmenter = function () {
    return {
      segment: text => text.split(" ")
    };
  };
}
