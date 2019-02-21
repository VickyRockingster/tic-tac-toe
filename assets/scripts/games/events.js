const ui = require('./ui.js')
const api = require('./api.js')
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
let turnTracker

const showAccountPage = function (event) {
  event.preventDefault()
  const email = store.user.email
  // const games = store.games
  $('h1').html('Tic-Tac-Toe')
  $('.account').removeClass('hidden')
  $('main').addClass('hidden')
  $('.email').html('Email: ' + email)
  $('.email').addClass('header')
}

const showGamePage = function (event) {
  event.preventDefault()
  $('main').removeClass('hidden')
  $('section').addClass('hidden')
}

const winOptions = function (gameArray) {
  switch (gameArray) {
    case gameArray[0] === gameArray[1] === gameArray[2]:
      gameArray[0] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[3] === gameArray[4] === gameArray[5]:
      gameArray[3] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[6] === gameArray[7] === gameArray[8]:
      gameArray[6] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[0] === gameArray[3] === gameArray[6]:
      gameArray[0] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[1] === gameArray[4] === gameArray[7]:
      gameArray[1] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[2] === gameArray[5] === gameArray[8]:
      gameArray[2] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[0] === gameArray[4] === gameArray[8]:
      gameArray[0] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case gameArray[6] === gameArray[4] === gameArray[2]:
      gameArray[6] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
  }
  return false
}

const didYouWin = function (gameArray) {
  if (winOptions(gameArray)) {
    $('#user-feedback').html('Game Over! Press Reset to start a new game!')
    turnTracker = undefined
  }
}

const onCreateGame = function (event) {
  api.createGame()
    .then(ui.createGameSuccess)
    .then(turnX(event))
    // .then(onUpdateGame(event))
    .catch(ui.failure)
}

const onUpdateGame = function (event) {
  const gameEleIndex = $(event.target).val('id')
  const gameEleValue = $(event.target).html()
  const newMove = {
    'game': {
      'cell': {
        'index': gameEleIndex,
        'value': gameEleValue
      },
      'over': false
    }
  }
  console.log(store)
  console.log(store.gameId)
  api.updateGame(store.gameId, newMove)
    .then(ui.updateGameSuccess)
    .then(didYouWin)
    .catch(ui.failure)
}

const turnX = function (event) {
  if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
    $(event.target).addClass('stay-red')
    $(event.target).html('X')
    onUpdateGame(event)
    $('#user-feedback').html('Now it\'s O\'s turn!')
    turnTracker = false
  } else {
    ui.failure()
  }
  console.log('turnX ran!')
  return turnTracker
}

const turnO = function (event) {
  if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
    $(event.target).addClass('stay-blue')
    $(event.target).html('O')
    onUpdateGame(event)
    $('#user-feedback').html('Now it\'s X\'s turn!')
    turnTracker = true
  } else {
    ui.failure()
  }
  console.log('turnO ran!')
  return turnTracker
}

const onClick = function (event) {
  event.preventDefault()
  if (turnTracker === false) {
    turnO(event)
  } else if (turnTracker === true) {
    turnX(event)
  } else if (turnTracker === undefined) {
    onCreateGame(event)
  }
}

const clearBoard = (event) => {
  event.preventDefault()
  $('.box').html('')
  $('.box').removeClass('stay-red')
  $('.box').removeClass('stay-blue')
  $('h1').html('Tic-Tac-Toe')
  turnTracker = undefined
}

const onMouseOver = function (event) {
  // event.preventDefault()
  turnTracker === true || turnTracker === undefined
    ? $(event.target).addClass('turn-red') : $(event.target).addClass('turn-blue')
  console.log(turnTracker)
  console.log('onMouseOver just ran!')
}

const onMouseOut = function (event) {
  // event.preventDefault()
  $(event.target).removeClass('turn-red')
  $(event.target).removeClass('turn-blue')
  console.log('onMouseOut just ran!')
}

module.exports = {
  turnTracker,
  showAccountPage,
  showGamePage,
  onMouseOver,
  onMouseOut,
  onCreateGame,
  onUpdateGame,
  turnX,
  turnO,
  onClick,
  winOptions,
  didYouWin,
  clearBoard
  // onGetGames,
  // onGetGame,
}
