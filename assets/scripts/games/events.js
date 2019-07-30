const ui = require('./ui.js')
const api = require('./api.js')
const store = require('../store.js')

const onGetGames = (event) => {
  event.preventDefault()

  api.getGames()
    .then(ui.getGamesSuccess)
    .catch(ui.failure)
}

// const onGetGame = (event) => {
//   event.preventDefault()
//   // event.stopPropogation()
//   // console.log(`JSON stringified store: ${JSON.stringify(store)}`)
//
//   const gameId = $(event.target).data('id')
//
//   api.getGame(gameId)
//     .then(ui.getGameSuccess)
//     .catch(ui.failure)
// }

const gameModel = {
  // tracks whose turn it is by tracking how many clicks
  gameCounter: 0,
  // this method iterates the counter that tracks the number of clicks
  gameCounterIterator: () => {
    gameModel.gameCounter += 1
    console.log(`gameModel.gameCounter: ${gameModel.gameCounter}`)
    return gameModel.gameCounter
  },
  // this method tracks the counter to say whose turn it is; will return true
  // when it's x's turn and false when it's o's turn
  whoseTurn: () => {
    if (gameModel.gameCounter % 2 === 1) {
      return true // it's o's turn
    } else if (gameModel.gameCounter % 2 === 0) {
      return false // it's x's turn
    }
  },
  // use gameCounter(game has started) and whoseTurn(true is x and false is o)
  // to see whose turn it is to turn the box blue or red
  onMouseEnter: event => {
    event.preventDefault()
    if (!gameModel.didYouWin()) {
      gameModel.whoseTurn() ? $(event.target).addClass('turn-blue') : $(event.target).addClass('turn-red')
    }
  },
  onMouseLeave: event => {
    event.preventDefault()
    $(event.target).removeClass('turn-red')
    $(event.target).removeClass('turn-blue')
  },
  takeTurns: event => {
    event.preventDefault()
    gameModel.whoseTurn() ? gameModel.turnO(event) : gameModel.turnX(event)
    gameModel.gameCounterIterator()
  },
  turnX: event => {
    if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
      $(event.target).addClass('stay-red')
      $(event.target).html('X')
      const gameEleIndex = $(event.target).data('cell-index')
      const gameEleValue = 'X'
      const newMove = {
        game: {
          cell: {
            index: gameEleIndex,
            value: gameEleValue
          },
          over: gameModel.didYouWin()
        }
      }
      api.updateGame(store.currentGame.id, newMove)
        .then(ui.updateGameSuccess)
        .then(gameModel.didYouWin)
        .then(boolean => {
          boolean === false ? $('#user-feedback').html('Now it\'s O\'s turn!')
            : $('#user-feedback').html('')
        })
        .catch(ui.failure)
    }
  },
  turnO: event => {
    if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
      $(event.target).addClass('stay-blue')
      $(event.target).html('O')
      const gameEleIndex = $(event.target).data('cell-index')
      const gameEleValue = 'O'
      const newMove = {
        game: {
          cell: {
            index: gameEleIndex,
            value: gameEleValue
          },
          over: gameModel.didYouWin()
        }
      }
      api.updateGame(store.currentGame.id, newMove)
        .then(ui.updateGameSuccess)
        .then(gameModel.didYouWin)
        .then((boolean) => {
          boolean === false ? $('#user-feedback').html('Now it\'s X\'s turn!')
            : $('#user-feedback').html('')
        })
        .catch(ui.failure)
    }
  },
  // this method checks to see if someone won after 5 clicks; will return true
  // when the game is over (someone wins or it's a draw); otherwise will return
  // false
  didYouWin: () => {
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
      $('h1').html('Game over; X Wins!')
      $('.row').off('click', gameModel.onClick)
      // $('.row').off('hover', '.box', gameModel.onMouseEnter)
      setTimeout(() => {
        $('.box').html('')
        $('.box').removeClass('stay-red')
        $('.box').removeClass('stay-blue')
        $('h1').html('Tic-Tac-Toe')
      }, 3000)
      return true
    } else if ((store.currentGame.cells[0] === store.currentGame.cells[1] && store.currentGame.cells[1] === store.currentGame.cells[2] && store.currentGame.cells[2] === 'O') ||
    (store.currentGame.cells[3] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[5] && store.currentGame.cells[5] === 'O') ||
    (store.currentGame.cells[6] === store.currentGame.cells[7] && store.currentGame.cells[7] === store.currentGame.cells[8] && store.currentGame.cells[8] === 'O') ||
    (store.currentGame.cells[0] === store.currentGame.cells[3] && store.currentGame.cells[3] === store.currentGame.cells[6] && store.currentGame.cells[6] === 'O') ||
    (store.currentGame.cells[1] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[7] && store.currentGame.cells[7] === 'O') ||
    (store.currentGame.cells[2] === store.currentGame.cells[5] && store.currentGame.cells[5] === store.currentGame.cells[8] && store.currentGame.cells[8] === 'O') ||
    (store.currentGame.cells[0] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[8] && store.currentGame.cells[8] === 'O') ||
    (store.currentGame.cells[2] === store.currentGame.cells[4] && store.currentGame.cells[4] === store.currentGame.cells[6] && store.currentGame.cells[6] === 'O')) {
      $('h1').html('Game over; O Wins!')
      $('.row').off('click', gameModel.onClick)
      setTimeout(() => {
        $('.box').html('')
        $('.box').removeClass('stay-red')
        $('.box').removeClass('stay-blue')
        $('h1').html('Tic-Tac-Toe')
      }, 3000)
      return true
    } else if (gameModel.gameCounter === 9) {
      $('h1').html('Game Over! It\'s a Draw!')
      $('.row').off('click', gameModel.onClick)
      setTimeout(() => {
        $('.box').html('')
        $('.box').removeClass('stay-red')
        $('.box').removeClass('stay-blue')
        $('h1').html('Tic-Tac-Toe')
      }, 3000)
      return true
    } else { return false }
  },
  onClick: event => {
    event.preventDefault()
    if (gameModel.gameCounter === 0) {
      api.createGame()
        .then(ui.createGameSuccess)
        .then(() => gameModel.turnX(event))
        // .then(() => {
        //   gameModel.gameCounter += 1
        //   return gameModel.gameCounter
        // })
        .then(gameModel.gameCounterIterator())
        .then(console.log('clicked at the end!'))
        .catch(ui.failure)
    } else { gameModel.takeTurns(event) }
  }
}

// const startGame = (event) => {
//   event.preventDefault()
//   // $('.box').html('')
//   // $('.box').removeClass('stay-red')
//   // $('.box').removeClass('stay-blue')
//   // $('h1').html('Tic-Tac-Toe')
//   // $('#user-feedback').html('')
//   $('.box').one('click', () => {
//     event.preventDefault()
//     gameModel.whoseTurn() ? gameModel.turnX(event) : gameModel.turnO(event)
//     gameModel.gameCounterIterator()
//   })
//   gameModel.gameCounter = 1
//
//   api.createGame()
//     .then(ui.createGameSuccess)
//     .catch(ui.failure)
// }

const addHandlers = function () {
  $('.box').hover(gameModel.onMouseEnter, gameModel.onMouseLeave)
  // $('.box').on('click', gameModel.onClick)
  $('.row').on('click', '.box', gameModel.onClick)

  // $('.box').trigger('click')
  // $('#start-game-button').on('click', gameModel.onClick)
  // $('#display-games').on('click', '.get-game-button', onGetGame)
  $('#get-games-button').on('click', onGetGames)
}

module.exports = {
  addHandlers
}
