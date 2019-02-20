const ui = require('./ui.js')
const api = require('./api.js')
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
// onMouseover - access those turn it is via clicktracker
// onClick
=======

const onClick = function (event) {
  event.preventDefault()
  $(event.target).html() !== 'X' && $(event.target).html() !== 'O' ? validMove(event) : ui.failure()
}

>>>>>>> Stashed changes
const clearBoard = (event) => {
  event.preventDefault()
  console.log('clearBoard was called!')
  $('.box').html('')
  $('.box').removeClass('turn-red')
  $('.box').removeClass('turn-blue')
  counter = 0
}

module.exports = {
<<<<<<< Updated upstream
=======
  // onGetGames,
  // onGetGame,
  onCreateGame,
  onUpdateGame,
>>>>>>> Stashed changes
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
