const ui = require('./ui.js')
const api = require('./api.js')
const store = require('../store.js')

const showAccountPage = (event) => {
  event.preventDefault()
  const email = store.user.email
  // const games = store.games
  $('h1').html('Tic-Tac-Toe')
  $('.account').removeClass('hidden')
  $('#account').addClass('hidden')
  $('#game-page').removeClass('hidden')
  $('main').addClass('hidden')
  $('.email').html('Email: ' + email)
  $('.email').addClass('header')
}

const showGamePage = (event) => {
  event.preventDefault()
  $('main').removeClass('hidden')
  $('section').addClass('hidden')
  $('#game-page').addClass('hidden')
}

// const turnX = function (event) {
//   // onRedTurn(event)
//   $(event.target).addClass('stay-red')
//   $(event.target).html('X')
//   console.log('turnX was called!')
// }
//
// const turnO = function (event) {
//   // onBlueTurn(event)
//   $(event.target).addClass('stay-blue')
//   $(event.target).html('O')
//   console.log('turnO was called!')
// }

let counter = 0

const clickTracker = function () {
  counter += 1
  console.log('clickTracker ran!')
  return counter
}

const whoseTurn = function () {
  // event.preventDefault()
  // console.log(`${counter} in the whose turn function`)
  if (counter % 2 === 1) {
    return true // now it's x's turn
  } else if (counter % 2 === 0 && counter !== 0) {
    return false // now it's o's turn
  } else { return undefined }
}

const onMouseEnter = (event) => {
  event.stopPropagation()
  event.preventDefault()
  if (counter !== 0) {
    whoseTurn() ? $(event.target).addClass('turn-red') : $(event.target).addClass('turn-blue')
  }// console.log(turnTracker())
  // console.log('onMouseEnter just ran!')
}

const onMouseLeave = (event) => {
  event.stopPropagation()
  event.preventDefault()
  $(event.target).removeClass('turn-red')
  $(event.target).removeClass('turn-blue')
  // console.log('onMouseLeave just ran!')
}

const onCreateGame = () => {
  // event.preventDefault()
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.failure)
  clickTracker()
  // console.log('onCreateGame ran!')
  console.log('from onCreateGame:', store.gameId)
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
    // onUpdateGame(event)
    $('#user-feedback').html('Now it\'s O\'s turn!')
    const gameEleIndex = $(event.target).val('id')
    const gameEleValue = 'X' // $(event.target).html()
    const newMove = {
      game: {
        cell: {
          index: gameEleIndex,
          value: gameEleValue
        },
        over: false
      }
    }
    api.updateGame(store.gameId, newMove)
      .then(ui.updateGameSuccess)
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
    const gameEleIndex = $(event.target).val('id')
    const gameEleValue = 'O' // $(event.target).html()
    const newMove = {
      game: {
        cell: {
          index: gameEleIndex,
          value: gameEleValue
        },
        over: false
      }
    }
    api.updateGame(store.gameId, newMove)
      .then(ui.updateGameSuccess)
      .catch(ui.failure)
  }
}

const onClick = (event) => {
  event.stopPropagation()
  event.preventDefault()
  // if (counter === 1) {
  //   onCreateGame()
  //   // onUpdateGame()
  // }
  whoseTurn() ? turnX(event) : turnO(event)
  clickTracker()
  // onUpdateGame(event)
}

const startGame = (event) => {
  event.stopPropagation()
  event.preventDefault()
  $('.box').html('')
  $('.box').removeClass('stay-red')
  $('.box').removeClass('stay-blue')
  $('h1').html('Tic-Tac-Toe')
  console.log('startGame was called!')
  onCreateGame()
}

module.exports = {
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
  startGame
  // onUpdateGame
}
