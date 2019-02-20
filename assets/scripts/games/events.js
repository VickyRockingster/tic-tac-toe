const ui = require('./ui.js')
const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const store = require('../store.js')

// const onGetGames = function (event) {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   api.getGames(data.game)
//     .then(ui.getGamesSuccess)
//     .catch(ui.failure)
// }
//
// const onGetGame = function (event) {
//   event.preventDefault()
//   api.getGame(store.game.id)
//     .then(ui.getGameSuccess)
//     .catch(ui.failure)
// }

const showAccountPage = function (event) {
  event.preventDefault()
  const email = store.user.email
  // const games = store.games
  $('.account').removeClass('hidden')
  $('main').addClass('hidden')
  $('.email').html('Email: ' + email)
  $('.email').addClass('header')
}

const didYouWin = function (gameArray) {
  switch (gameArray) {
    case gameArray[0] === gameArray[1] === gameArray[2]:
      gameArray[0] ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[3] === gameArray[4] === gameArray[5]:
      gameArray[3] ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[6] === gameArray[7] === gameArray[8]:
      gameArray[6] ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[0] === gameArray[3] === gameArray[6]:
      gameArray[0] ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[1] === gameArray[4] === gameArray[7]:
      gameArray[1] ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[2] === gameArray[5] === gameArray[8]:
      gameArray[2] ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[0] === gameArray[4] === gameArray[8]:
      gameArray[0] ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[6] === gameArray[4] === gameArray[2]:
      gameArray[6] ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
  }
}

const onCreateGame = function (event) {
  event.preventDefault()
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.failure)
}

const onUpdateGame = function (event) {
  event.preventDefault()
  const gameEleIndex = $(event.target).attr('id')
  const gameEleValue = $(event.target).html()
  const newMove = {
    'game': {
      'cell': {
        'index': gameEleIndex,
        'value': gameEleValue
      },
      'over': didYouWin(store.game.cells)
    }
  }
  api.updateGame(store.game.id, newMove)
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
    return true
  } else {
    return false
  }
}

const onMouseover = (event) => {
  event.preventDefault()
  whoseTurn() ? onRedTurn(event) : onBlueTurn(event)
}

const onMouseout = (event) => {
  event.preventDefault()
  $(event.target).removeClass('turn-red')
  $(event.target).removeClass('turn-blue')
}

const validMove = (event) => {
  if (counter === 1) {
    onCreateGame(event)
    turnX(event)
    clickTracker()
    onUpdateGame(event)
  } else {
    whoseTurn() ? turnX(event) : turnO(event)
    clickTracker()
    onUpdateGame(event)
  }
}

const onClick = function (event) {
  event.preventDefault()
  $(event.target).html() !== 'X' && $(event.target).html() !== 'O' ? validMove(event) : ui.failure()
}

const clearBoard = (event) => {
  event.preventDefault()
  $('.box').html('')
  $('.box').removeClass('turn-red')
  $('.box').removeClass('turn-blue')
  counter = 0
  store.game.over = true
  onUpdateGame(event)
}

module.exports = {
  // onGetGames,
  // onGetGame,
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
  validMove,
  clearBoard,
  showAccountPage
}
