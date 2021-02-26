const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'hy',
  otherLanguages: ['en'],
  localeSubpaths: true,
  serverLanguageDetection: false,
});
