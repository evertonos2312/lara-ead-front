module.exports = {
    ci: {
      collect: {
        numberOfRuns: 3,
        staticDistDir: "dist/lara-ead-front",
      },
      assert: {
        assertions: {
          "first-contenful-paint": ["warn", { maxNumericValue: 4000}],
          "categories:performance": ['warn', {minScore: 1}],
          "categories:accessibility": ['error', {minScore: 1}]
        }
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };