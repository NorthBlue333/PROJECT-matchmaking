/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@scss', path.join(__dirname, 'src/assets/scss'))
  },

  devServer: {
    disableHostCheck: true,
  },
}
