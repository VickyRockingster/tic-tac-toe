const store = require('../store.js')
const events = require('../games/events.js')

const signInSuccess = function (data) {
  $('#user-feedback').html('Welcome!')
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  store.user = data.user
  $('nav').removeClass('hidden')
  $('nav').show()
  $('#game-page-button').hide()
  $('#account-button').show()

  $('.game-page-view').removeClass('hidden')
  $('.game-page-view').show()
  $('.authentication-page-view').hide()
  $('.account-page-view').removeClass('hidden')
  $('.account-page-view').hide()
  $('.box').off('click', events.onClick)
  setTimeout(() => {
    $('#user-feedback').html('')
  }, 3000)
}

const signOutSuccess = function (data) {
  $('#user-feedback').html('Come back soon!')
  store.user = null
  $('.authentication-page-view').show()
  $('nav').hide()
  $('.game-page-view').hide()
  $('.account-page-view').hide()
  $('#display-games').html('')

  setTimeout(() => {
    $('#user-feedback').html('')
  }, 3000)
}

const changePasswordSuccess = function () {
  $('#user-feedback').html('You have successfully changed your password!')
  $('#change-password-form').trigger('reset')
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
