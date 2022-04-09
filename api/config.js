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
    appId: '',
    appSecret: '',
  },
};