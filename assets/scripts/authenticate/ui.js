const store = require('../store.js')
const events = require('../games/events.js')

const signUpSuccess = function () {
  $('#user-feedback').html('You have successfully signed up!')
  $('#sign-up').trigger('reset')
  setTimeout(() => {
    $('#user-feedback').html('')
  }, 3000)
}

const signInSuccess = function (data) {
  $('#user-feedback').html('You have successfully signed in!')
  $('#sign-in').trigger('reset')
  store.user = data.user
  $('nav').removeClass('hidden')
  $('#game-page').addClass('hidden')
  $('main').removeClass('hidden')
  $('section').addClass('hidden')
  $('.box').off('click', events.onClick)
  setTimeout(() => {
    $('#user-feedback').html('')
  }, 3000)
}

const signOutSuccess = function (data) {
  $('#user-feedback').html('You have successfully signed out!')
  $('#sign-out').trigger('reset')
  store.user = null
  $('h1').html('Tic-Tac-Toe')
  $('section').removeClass('hidden')
  $('.account').addClass('hidden')
  $('main').addClass('hidden')
  $('nav').addClass('hidden')
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
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  failure
}
