const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  mongo: {
    db: 'mongodb://localhost/gallery-app',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '522171076196691',
    appSecret: '80dd03bb34a4a3150e193af4b8bf6627',
  },
};