if (!Promise.any) {
  Promise.any = function(promises) {
    return new Promise((resolve, reject) => {
      let errors = [];
      let remaining = promises.length;
      promises.forEach((p, i) =>
        Promise.resolve(p).then(resolve, (err) => {
          errors[i] = err;
          if (--remaining === 0) reject(errors);
        })
      );
    });
  };
  console.log("✅ Polyfilled Promise.any()");
}
