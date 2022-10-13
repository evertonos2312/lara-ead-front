module.exports = {
    ci: {
      collect: {
        numberOfRuns: 3,
      },
      assert: {
        assertions: {
          "first-conteful-paint": ["warn", { maxNumericValue: 4000}],
        }
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };