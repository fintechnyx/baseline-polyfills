if (!Promise.any) {
  Promise.any = function(promises) {
    return new Promise((resolve, reject) => {
      let errors = [];
      let remaining = promises.length;
      promises.forEach(p => {
        Promise.resolve(p).then(resolve).catch(err => {
          errors.push(err);
          remaining--;
          if (remaining === 0) reject(new AggregateError(errors, "All promises were rejected"));
        });
      });
    });
  };
}
