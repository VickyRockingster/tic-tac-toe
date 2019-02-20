const ui = require('./ui.js')
const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]]

const onGetGames = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.getGames(data.game)
    .then(ui.getGamesSuccess)
    .catch(ui.failure)
}

const onGetGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.getGame(data.game.id)
    .then(ui.getGameSuccess)
    .catch(ui.failure)
}

const onCreateGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createGame(data.game)
    .then(ui.createGameSuccess)
    .catch(ui.failure)
}

const onUpdateGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateGame(data.game.id)
    .then(ui.updateGameSuccess)
    .catch(ui.failure)
}

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
  onRedTurn(event)
  $(event.target).html('X')
}

const turnO = function (event) {
  onBlueTurn(event)
  $(event.target).html('O')
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
  if (counter % 2 === 1) {
    api.createGame()
  } else {
    api.updateGame()
  }
  whoseTurn() ? turnX(event) : turnO(event)
  clickTracker()
}

const invalidMove = function (event) {
  $(event.target).html() !== null ? onClick(event) : ui.failure()
}

const clearBoard = (event) => {
  event.preventDefault()
  $('.box').html('')
  $('.box').removeClass('turn-red')
  $('.box').removeClass('turn-blue')
  counter = 0
}

module.exports = {
  onGetGames,
  onGetGame,
  onCreateGame,
  onUpdateGame,
  turnX,
  turnO,
  whoseTurn,
  onBlueTurn,
  onRedTurn,
  onMouseover,
  onMouseout,
  onClick,
  invalidMove,
  clearBoard
}
