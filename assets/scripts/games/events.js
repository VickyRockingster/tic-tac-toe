const ui = require('./ui.js')
const api = require('./api.js')

let counter = 1

const clickTracker = function () {
  counter += 1
  return counter
}

const onRedTurn = function (event) {
  $(event.target).addClass('turn-red')
}
const onBlueTurn = function (event) {
  $(event.target).addClass('turn-blue')
}

const turnX = function (event) {
  // onRedTurn(event)
  $(event.target).addClass('turn-red')
  $(event.target).html('X')
  console.log('turnX was called!')
}

const turnO = function (event) {
  // onBlueTurn(event)
  $(event.target).addClass('turn-blue')
  $(event.target).html('O')
  console.log('turnO was called!')
}

const whoseTurn = function () {
  event.preventDefault()
  // console.log(`${counter} in the whose turn function`)
  if (counter % 2 === 1) {
    return true // now it's x's turn
  } else {
    return false // now it's o's turn
  }
}

const onMouseover = (event) => {
  whoseTurn() ? onRedTurn(event) : onBlueTurn(event)
}

const onMouseout = (event) => {
  $(event.target).removeClass('turn-red')
  $(event.target).removeClass('turn-blue')
}

const onClick = (event) => {
  whoseTurn() ? turnX(event) : turnO(event)
  clickTracker()
}
// onMouseover - access those turn it is via clicktracker
// onClick
const clearBoard = (event) => {
  event.preventDefault()
  console.log('clearBoard was called!')
  $('.box').html('')
  $('.box').removeClass('turn-red')
  $('.box').removeClass('turn-blue')
  counter = 0
}

module.exports = {
  turnX,
  turnO,
  whoseTurn,
  onBlueTurn,
  onRedTurn,
  onMouseover,
  onMouseout,
  onClick,
  clearBoard
}
