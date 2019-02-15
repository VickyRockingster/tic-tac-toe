'use strict'

let apiUrl
const apiUrls = {
  production: '<replace-with-heroku-url>',
  development: 'https://wdi-library-api.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
