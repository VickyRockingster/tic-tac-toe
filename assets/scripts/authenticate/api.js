const config = require('../config.js')
const store = require('../store.js')

const signUp = function (credentials) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: credentials
  })
}

const signIn = function (credentials) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: credentials
  })
}

const signOut = function (credentials) {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = function (passwords) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: passwords
  })
}

// const accountInfo = function (credentials) {
//   return $.ajax({
//     url: config.apiUrl + '/sign-in',
//     method: 'GET',
//     data: credentials
//   })
// }

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
  // accountInfo
}
