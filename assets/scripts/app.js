'use strict'
const gameEvents = require('./games/events.js')
const authEvents = require('./authenticate/events.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.addHandlers()
  gameEvents.addHandlers()
})
