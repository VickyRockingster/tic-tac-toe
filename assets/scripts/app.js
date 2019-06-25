'use strict'
const gameEvents = require('./games/events.js')
const authEvents = require('./authenticate/events.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// hides the game page-view and shows the page-view to get 1 or all games or change password
const showAccountPage = (event) => {
  event.preventDefault()
  // const email = store.user.email
  // $('.email').html('Email: ' + email)
  $('.email').addClass('header')
  $('.account-page-view').show()
  $('.game-page-view').hide()
  $('.authentication-page-view').hide()
  $('#account-button').hide()
  $('#game-page-button').show()
  $('#user-feedback').html('')
}

// hides the account page-view and shows the page-view to play the game
const showGamePage = (event) => {
  event.preventDefault()
  $('.game-page-view').show()
  $('.account-page-view').hide()
  $('.authentication-page-view').hide()
  $('#account-button').show()
  $('#game-page-button').hide()
  $('#user-feedback').html('')
}

$(() => {
  authEvents.addHandlers()
  gameEvents.addHandlers()
  $('#account-button').on('click', showAccountPage)
  $('#game-page-button').on('click', showGamePage)
})
