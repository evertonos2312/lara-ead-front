module.exports = {
    ci: {
      collect: {
        startServerCommand: 'ng serve',
        url: ['http://localhost:4200']
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };