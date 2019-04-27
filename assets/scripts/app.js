'use strict'
const events = require('./games/events.js')
const authEvents = require('./authenticate/events.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.addHandlers()
  $('.box').hover(events.onMouseEnter, events.onMouseLeave)
  $('.box').one('click', events.onClick)
  $('#start-game').on('click', events.startGame)
  $('#account-button').on('click', events.showAccountPage)
  $('#game-page-button').on('click', events.showGamePage)
  $('#get-game-button').on('click', events.onGetGame)
  $('#get-games-button').on('click', events.onGetGames)
})
