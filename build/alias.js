let path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  'vue': 'mpvue',
  '@': resolve('src'),
  'components': resolve('src/components'),
  'pages': resolve('src/pages'),
  'services': resolve('src/services'),
  'less': resolve('src/less'),
  'img': resolve('src/img'),
  'utils': resolve('src/utils'),
  'libs': resolve('src/libs'),
  'store': resolve('src/store'),
}
