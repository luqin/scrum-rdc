// const path = require('path')

module.exports = {
  assetsRoot: './lib',
  dev: {
    proxy: '172.17.189.69:9090', // 代理地址
    port: 8888,
    autoOpenBrowser: true
  }
}

