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
  $('#display-games').html('')
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

// const winOptions = function (gameArray) {
//   switch (gameArray) {
//     case gameArray[0] === gameArray[1] === gameArray[2]:
//       gameArray[0] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
//       return true
//     case gameArray[3] === gameArray[4] === gameArray[5]:
//       gameArray[3] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
//       return true
//     case gameArray[6] === gameArray[7] === gameArray[8]:
//       gameArray[6] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
//       return true
//     case gameArray[0] === gameArray[3] === gameArray[6]:
//       gameArray[0] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
//       return true
//     case gameArray[1] === gameArray[4] === gameArray[7]:
//       gameArray[1] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
//       return true
//     case gameArray[2] === gameArray[5] === gameArray[8]:
//       gameArray[2] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
//       return true
//     case gameArray[0] === gameArray[4] === gameArray[8]:
//       gameArray[0] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
//       return true
//     case gameArray[2] === gameArray[4] === gameArray[6]:
//       gameArray[2] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
//       return true
//   }
//   return false
// }

const winOptions = function () {
  switch (store.currentGame.cells) {
    case store.currentGame.cells[0] === store.currentGame.cells[1] === store.currentGame.cells[2]:
      store.currentGame.cells[0] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case store.currentGame.cells[3] === store.currentGame.cells[4] === store.currentGame.cells[5]:
      store.currentGame.cells[3] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case store.currentGame.cells[6] === store.currentGame.cells[7] === store.currentGame.cells[8]:
      store.currentGame.cells[6] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case store.currentGame.cells[0] === store.currentGame.cells[3] === store.currentGame.cells[6]:
      store.currentGame.cells[0] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case store.currentGame.cells[1] === store.currentGame.cells[4] === store.currentGame.cells[7]:
      store.currentGame.cells[1] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case store.currentGame.cells[2] === store.currentGame.cells[5] === store.currentGame.cells[8]:
      store.currentGame.cells[2] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case store.currentGame.cells[0] === store.currentGame.cells[4] === store.currentGame.cells[8]:
      store.currentGame.cells[0] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
    case store.currentGame.cells[2] === store.currentGame.cells[4] === store.currentGame.cells[6]:
      store.currentGame.cells[2] === 'X' ? $('h1').html('X Wins!') : $('h1').html('O Wins!')
      return true
  }
  return false
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
  }
}

const onMouseLeave = (event) => {
  event.stopPropagation()
  event.preventDefault()
  $(event.target).removeClass('turn-red')
  $(event.target).removeClass('turn-blue')
}

const onCreateGame = () => {
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.failure)
  clickTracker()
}

// const onUpdateGame = (event) => {
//   event.stopPropagation()
//   event.preventDefault()
//   const gameEleIndex = $(event.target).val('id')
//   const gameEleValue = $(event.target).html()
//   const newMove = {
//     'game': {
//       'cell': {
//         'index': gameEleIndex,
//         'value': gameEleValue
//       },
//       'over': false
//     }
//   }
//   console.log('the following is from onUpdateGame:')
//   console.log('store:' + store)
//   console.log('store:gameId:' + store.gameId)
//   console.log('newMove:' + newMove)
//   api.updateGame(store.gameId, newMove)
//     .then(ui.updateGameSuccess)
//     // .then(didYouWin)
//     .catch(ui.failure)
//   // console.log(didYouWin())
// }

const turnX = (event) => {
  if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
    $(event.target).addClass('stay-red')
    $(event.target).html('X')
    console.log('counter from turnX:', counter)
    $('#user-feedback').html('Now it\'s O\'s turn!')
    const gameEleIndex = $(event.target).data('cell-index')
    const gameEleValue = 'X' // $(event.target).html()
    const newMove = {
      game: {
        cell: {
          index: gameEleIndex,
          value: gameEleValue
        },
        over: false // winOptions(store.currentGame.cells)
      }
    }
    console.log('gameEleIndex from turnX:', gameEleIndex)
    console.log('newMove from turX:', newMove)
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
    console.log('counter from turnO:', counter)
    console.log('turnO ran!')
    // onUpdateGame(event)
    $('#user-feedback').html('Now it\'s X\'s turn!')
    const gameEleIndex = $(event.target).data('cell-index')
    const gameEleValue = 'O' // $(event.target).html()
    const newMove = {
      game: {
        cell: {
          index: gameEleIndex,
          value: gameEleValue
        },
        over: false // winOptions(store.currentGame.cells)
      }
    }
    console.log('gameEleIndex from turnO:', gameEleIndex)
    console.log('newMove from turnO:', newMove)
    api.updateGame(store.currentGame.id, newMove)
      .then(ui.updateGameSuccess)
      .then(didYouWin)
      .catch(ui.failure)
  }
}

const onClick = (event) => {
  // event.stopPropagation()
  event.preventDefault()
  whoseTurn() ? turnX(event) : turnO(event)
  // if (counter >= 5) {
  //   didYouWin()
  // }
  clickTracker()
  console.log('winOptions: ' + winOptions())
}

const startGame = (event) => {
  event.preventDefault()
  $('.box').html('')
  $('.box').removeClass('stay-red')
  $('.box').removeClass('stay-blue')
  $('h1').html('Tic-Tac-Toe')
  $('#user-feedback').html('')
  console.log('startGame was called!')
  onCreateGame()
}

module.exports = {
  onGetGame,
  onGetGames,
  showAccountPage,
  showGamePage,
  onCreateGame,
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
  // onUpdateGame
}
