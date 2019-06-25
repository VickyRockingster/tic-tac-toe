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
  // api.getGame(store.lastGame.id)
  api.getGame(store.currentGame.id)
    .then(ui.getGameSuccess)
    .catch(ui.failure)
}

const gameModel = {
  // tracks whose turn it is by tracking how many clicks
  gameCounter: 0,
  // this method iterates the counter that tracks the number of clicks
  gameCounterIterator: () => {
    gameModel.gameCounter += 1
    return gameModel.gameCounter
  },
  // this method tracks the counter to say whose turn it is; will return true
  // when it's x's turn and false when it's o's turn
  whoseTurn: () => {
    if (gameModel.gameCounter % 2 === 1) {
      return true // it's x's turn
    } else if (gameModel.gameCounter % 2 === 0 && gameModel.gameCounter !== 0) {
      return false // it's o's turn
    } else { return undefined } // I am creating a game, and haven't clicked a .box yet
  },
  // use gameCounter(game has started) and whoseTurn(true is x and false is o)
  // to see whose turn it is to turn the box blue or red
  onMouseEnter: (event) => {
    // event.stopPropagation()
    event.preventDefault()
    if (gameModel.gameCounter !== 0) {
      gameModel.whoseTurn() ? $(event.target).addClass('turn-red') : $(event.target).addClass('turn-blue')
    }
  },
  onMouseLeave: (event) => {
    // event.stopPropagation()
    event.preventDefault()
    $(event.target).removeClass('turn-red')
    $(event.target).removeClass('turn-blue')
  },
  onClick: (event) => {
    event.preventDefault()
    gameModel.whoseTurn() ? gameModel.turnX(event) : gameModel.turnO(event)
    gameModel.gameCounterIterator()
  },
  turnX: (event) => {
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
          over: gameModel.winOptions()
        }
      }
      api.updateGame(store.currentGame.id, newMove)
        .then(ui.updateGameSuccess)
        .then(gameModel.winOptions)
        .catch(ui.failure)
    }
  },
  turnO: (event) => {
    if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
      $(event.target).addClass('stay-blue')
      $(event.target).html('O')
      $('#user-feedback').html('Now it\'s X\'s turn!')
      const gameEleIndex = $(event.target).data('cell-index')
      const gameEleValue = 'O'
      const newMove = {
        game: {
          cell: {
            index: gameEleIndex,
            value: gameEleValue
          },
          over: gameModel.winOptions()
        }
      }
      api.updateGame(store.currentGame.id, newMove)
        .then(ui.updateGameSuccess)
        .then(gameModel.winOptions)
        .catch(ui.failure)
    }
  },
  // this method checks to see if someone won after 5 clicks; will return true
  // when the game is over (someone wins or it's a draw); otherwise will return
  // false
  winOptions: () => {
    if (gameModel.gameCounter < 5) {
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
      $('.box').off('click', gameModel.onClick)
      $('#user-feedback').html('Game Over! Press the button to start a new game!')
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
      $('.box').off('click', gameModel.onClick)
      $('#user-feedback').html('Game Over! Press the button to start a new game!')
      return true
    } else if (gameModel.gameCounter === 9) {
      $('h1').html('It\'s a Draw!')
      $('.box').off('click', gameModel.onClick)
      $('#user-feedback').html('Game Over! Press the button to start a new game!')
      return true
    } else { return false }
  }
}

const startGame = (event) => {
  event.preventDefault()
  $('.box').html('')
  $('.box').removeClass('stay-red')
  $('.box').removeClass('stay-blue')
  $('h1').html('Tic-Tac-Toe')
  $('#user-feedback').html('')
  $('.box').one('click', gameModel.onClick)

  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.failure)
  gameModel.gameCounter = 0
}

const addHandlers = function () {
  $('.box').hover(gameModel.onMouseEnter, gameModel.onMouseLeave)
  $('.box').one('click', gameModel.onClick)
  $('#start-game-button').on('click', startGame)
  $('#get-game-button').on('click', onGetGame)
  $('#get-games-button').on('click', onGetGames)
}

module.exports = {
  addHandlers
}
