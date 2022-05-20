const { i18n } = require('./next-i18next.config')
const path = require('path')

const dirResolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  i18n,
}
