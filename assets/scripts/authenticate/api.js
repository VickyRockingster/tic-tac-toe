const config = require('../config.js')

const signUp = function (credentials) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: credentials
  })
}

module.exports = {
  signUp
}
