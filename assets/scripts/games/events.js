const ui = require('./ui.js')
const api = require('./api.js')
const store = require('../store.js')

const onGetGames = (event) => {
  event.preventDefault()
  api.getGames()
    .then(ui.getGamesSuccess)
    .catch(ui.failure)
}

const onGetGame = (event) => {
  event.preventDefault()
  api.getGame(store.currentGame.id)
    .then(ui.getGameSuccess)
    .catch(ui.failure)
}

// hides the board and shows the "page" to get 1 or all games/change password
const showAccountPage = (event) => {
  event.preventDefault()
  const email = store.user.email
  $('h1').html('Tic-Tac-Toe')
  $('.account').removeClass('hidden')
  $('#account').addClass('hidden')
  $('#game-page').removeClass('hidden')
  $('main').addClass('hidden')
  $('.email').html('Email: ' + email)
  $('.email').addClass('header')
  $('#user-feedback').html('')
}

// hides the account "page "and shows the "page" to play the game
const showGamePage = (event) => {
  event.preventDefault()
  $('main').removeClass('hidden')
  $('section').addClass('hidden')
  $('#game-page').addClass('hidden')
  $('#account').removeClass('hidden')
  $('#user-feedback').html('')
  $('#display-games').html('')
}

// tracks whose turn it is by tracking how many clicks
let counter = 0

// this function iterates the counter that tracks the number of clicks
const clickTracker = function () {
  counter += 1
  return counter
}

// this function tracks the counter that tracks the number of clicks
const whoseTurn = function () {
  if (counter % 2 === 1) {
    return true // it's x's turn
  } else if (counter % 2 === 0 && counter !== 0) {
    return false // it's o's turn
  } else { return undefined } // I am creating a game, and haven't clicked a .box yet
}

const winOptions = function () {
  if (counter < 5) {
    return false
  } else if ((store.currentGame.cells[0] === store.currentGame.cells[1] && store.currentGame.cells[1] === store.currentGame.cells[2] && store.currentGame.cells[2] === 'X') ||
    (store.currentGame.cells[3] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[5] && store.currentGame.cells[5] === 'X') ||
    (store.currentGame.cells[6] === store.currentGame.cells[7] && store.currentGame.cells[7] === store.currentGame.cells[8] && store.currentGame.cells[8] === 'X') ||
    (store.currentGame.cells[0] === store.currentGame.cells[3] && store.currentGame.cells[3] === store.currentGame.cells[6] && store.currentGame.cells[6] === 'X') ||
    (store.currentGame.cells[1] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[7] && store.currentGame.cells[7] === 'X') ||
    (store.currentGame.cells[2] === store.currentGame.cells[5] && store.currentGame.cells[5] === store.currentGame.cells[8] && store.currentGame.cells[8] === 'X') ||
    (store.currentGame.cells[0] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[8] && store.currentGame.cells[8] === 'X') ||
    (store.currentGame.cells[2] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[6] && store.currentGame.cells[6] === 'X')) {
    $('h1').html('X Wins!')
    $('.box').off('click', onClick)
    return true
  } else if ((store.currentGame.cells[0] === store.currentGame.cells[1] && store.currentGame.cells[1] === store.currentGame.cells[2] && store.currentGame.cells[2] === 'O') ||
    (store.currentGame.cells[3] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[5] && store.currentGame.cells[5] === 'O') ||
    (store.currentGame.cells[6] === store.currentGame.cells[7] && store.currentGame.cells[7] === store.currentGame.cells[8] && store.currentGame.cells[8] === 'O') ||
    (store.currentGame.cells[0] === store.currentGame.cells[3] && store.currentGame.cells[3] === store.currentGame.cells[6] && store.currentGame.cells[6] === 'O') ||
    (store.currentGame.cells[1] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[7] && store.currentGame.cells[7] === 'O') ||
    (store.currentGame.cells[2] === store.currentGame.cells[5] && store.currentGame.cells[5] === store.currentGame.cells[8] && store.currentGame.cells[8] === 'O') ||
    (store.currentGame.cells[0] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[8] && store.currentGame.cells[8] === 'O') ||
    (store.currentGame.cells[2] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[6] && store.currentGame.cells[6] === 'O')) {
    $('h1').html('O Wins!')
    $('.box').off('click', onClick)
    return true
  } else if (counter === 9) {
    $('h1').html('It\'s a Draw!')
    $('.box').off('click', onClick)
    return true
  } else { return false }
}

const didYouWin = () => {
  if (winOptions()) {
    $('#user-feedback').html('Game Over! Press the button to start a new game!')
  }
}

const onMouseEnter = (event) => {
  event.stopPropagation()
  event.preventDefault()
  if (counter !== 0) {
    whoseTurn() ? $(event.target).addClass('turn-red') : $(event.target).addClass('turn-blue')
  } else { }
}

const onMouseLeave = (event) => {
  event.stopPropagation()
  event.preventDefault()
  $(event.target).removeClass('turn-red')
  $(event.target).removeClass('turn-blue')
}

const turnX = (event) => {
  if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
    $(event.target).addClass('stay-red')
    $(event.target).html('X')
    $('#user-feedback').html('Now it\'s O\'s turn!')
    const gameEleIndex = $(event.target).data('cell-index')
    const gameEleValue = 'X'
    const newMove = {
      game: {
        cell: {
          index: gameEleIndex,
          value: gameEleValue
        },
        over: winOptions()
      }
    }
    api.updateGame(store.currentGame.id, newMove)
      .then(ui.updateGameSuccess)
      .then(didYouWin)
      .catch(ui.failure)
  }
}

const turnO = (event) => {
  if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
    $(event.target).addClass('stay-blue')
    $(event.target).html('O')
    // onUpdateGame(event)
    $('#user-feedback').html('Now it\'s X\'s turn!')
    const gameEleIndex = $(event.target).data('cell-index')
    const gameEleValue = 'O'
    const newMove = {
      game: {
        cell: {
          index: gameEleIndex,
          value: gameEleValue
        },
        over: winOptions()
      }
    }
    api.updateGame(store.currentGame.id, newMove)
      .then(ui.updateGameSuccess)
      .then(didYouWin)
      .catch(ui.failure)
  }
}

const onClick = (event) => {
  event.preventDefault()
  whoseTurn() ? turnX(event) : turnO(event)
  clickTracker()
}

const startGame = (event) => {
  event.preventDefault()
  $('.box').html('')
  $('.box').removeClass('stay-red')
  $('.box').removeClass('stay-blue')
  $('h1').html('Tic-Tac-Toe')
  $('#user-feedback').html('')
  $('.box').one('click', onClick)
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.failure)
  counter = 0
  clickTracker()
}

module.exports = {
  onGetGame,
  onGetGames,
  showAccountPage,
  showGamePage,
  turnX,
  turnO,
  whoseTurn,
  onMouseEnter,
  onMouseLeave,
  clickTracker,
  onClick,
  startGame,
  winOptions,
  didYouWin
}
