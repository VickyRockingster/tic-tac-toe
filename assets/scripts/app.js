'use strict'
const events = require('./games/events.js')
const authEvents = require('./authenticate/events.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.addHandlers()
  $('.box').on('mouseover', events.onMouseOver)
  $('.box').on('mouseout', events.onMouseOut)
  $('.box').on('click', events.onClick)
  $('#clear-board').on('click', events.clearBoard)
  $('#account').on('submit', events.showAccountPage)
  $('#game-page').on('submit', events.showGamePage)
  $('#get-game').on('submit', events.onGetGame)
  $('#get-games').on('submit', events.onGetGames)
})
