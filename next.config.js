const withImages = require('next-images');

const config = {
  images: {
    domains: ['github.com'],
  },

  target: 'serverless',
};

module.exports = withImages(config);
