module.exports = {
  i18n: {
    localeDetection: false,
    defaultLocale: 'zh-CN',
    locales: ['zh-CN','en-US'],
  },
  serializeConfig: false, // because of the custom use i18next plugin
  saveMissing: true, // do not saveMissing to true for production
}
