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
  // $('#start-game').on('click', events.onCreateGame)
  $('#start-game').on('click', events.startGame)
  $('#account').on('submit', events.showAccountPage)
  $('#game-page').on('submit', events.showGamePage)
  $('#get-game').on('submit', events.onGetGame)
  $('#get-games').on('submit', events.onGetGames)
})
