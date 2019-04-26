const store = require('../store.js')
const events = require('../games/events.js')

const signInSuccess = function (data) {
  $('#user-feedback').html('Welcome! You have successfully signed in!')
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  store.user = data.user
  console.log('from sign in success, store.user:')
  console.log(store.user)
  $('nav').removeClass('hidden')
  $('#game-page-button').hide()
  $('.game-page-view').removeClass('hidden')
  $('.authentication-page-view').hide()
  $('.box').off('click', events.onClick)
  setTimeout(() => {
    $('#user-feedback').html('')
  }, 3000)
}

const signOutSuccess = function (data) {
  $('#user-feedback').html('Come back soon!')
  // $('#sign-out').trigger('reset')
  store.user = null
  // $('h1').html('Tic-Tac-Toe')
  $('section').removeClass('hidden')
  $('.account').addClass('hidden')
  // $('main').addClass('hidden')
  $('.authentication-page-view').show()
  // $('nav').addClass('hidden')
  $('nav').hide()
  $('.game-page-view').hide()
  $('#display-games').html('')
  setTimeout(() => {
    $('#user-feedback').html('')
  }, 3000)
}

const changePasswordSuccess = function () {
  $('#user-feedback').html('You have successfully changed your password!')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#user-feedback').html('')
  }, 3000)
}

const failure = function () {
  $('#user-feedback').html('There was an error processing your request. Please try again.')
  $('#user-feedback').addClass('error')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#user-feedback').html('')
    $('#user-feedback').removeClass('error')
  }, 3000)
}

module.exports = {
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  failure
}
