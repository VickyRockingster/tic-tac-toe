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

const onCreateGame = () => {
  event.preventDefault()
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.failure)
  console.log('onCreateGame ran!')
  console.log(store.gameId)
}

let counter = 1

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
  } else {
    return false // now it's o's turn
  }
}

const onMouseEnter = (event) => {
  event.preventDefault()
  whoseTurn() ? $(event.target).addClass('turn-red') : $(event.target).addClass('turn-blue')
  // console.log(turnTracker())
  // console.log('onMouseEnter just ran!')
}

const onMouseLeave = event => {
  event.preventDefault()
  $(event.target).removeClass('turn-red')
  $(event.target).removeClass('turn-blue')
  // console.log('onMouseLeave just ran!')
}

const onUpdateGame = (event) => {
  // event.preventDefault()
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
  console.log('the following is from onUpdateGame:')
  console.log(store)
  console.log(store.gameId)
  console.log(newMove)
  api.updateGame(store.gameId, newMove)
    .then(ui.updateGameSuccess)
    // .then(didYouWin)
    .catch(ui.failure)
  // console.log(didYouWin())
}

const turnX = (event) => {
  if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
    $(event.target).addClass('stay-red')
    $(event.target).html('X')
    // onUpdateGame(event)
    console.log(counter)
    $('#user-feedback').html('Now it\'s O\'s turn!')
    console.log('turnX ran!')
  } else {
    ui.failure()
  }
}

const turnO = (event) => {
  if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
    $(event.target).addClass('stay-blue')
    $(event.target).html('O')
    // onUpdateGame(event)
    console.log(counter)
    $('#user-feedback').html('Now it\'s X\'s turn!')
    console.log('turnO ran!')
  } else {
    ui.failure()
  }
}

const onClick = (event) => {
  event.preventDefault()
  // whoseTurn() ? turnX(event) : turnO(event)
  if (counter === 1) {
    onCreateGame()
  }

  if (whoseTurn() && $(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
    $(event.target).addClass('stay-red')
    $(event.target).html('X')
    // onUpdateGame(event)
    console.log(counter)
    $('#user-feedback').html('Now it\'s O\'s turn!')
    console.log('turnX ran!')
  } else {
    if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
      $(event.target).addClass('stay-blue')
      $(event.target).html('O')
      // onUpdateGame(event)
      console.log(counter)
      $('#user-feedback').html('Now it\'s X\'s turn!')
      console.log('turnO ran!')
    }
  }
  const gameEleIndex = $(event.target).val('id')
  const gameEleValue = $(event.target).html()
  const newMove = {
    game: {
      cell: {
        index: gameEleIndex,
        value: gameEleValue
      },
      over: false
    }
  }
  console.log('the following is from onUpdateGame:')
  console.log(store)
  console.log(store.gameId)
  console.log(newMove)
  api.updateGame(store.gameId, newMove)
    .then(ui.updateGameSuccess)
    .then(clickTracker)
    // .then(didYouWin)
    .catch(ui.failure)
  // console.log(didYouWin())
  // clickTracker()
}

const clearBoard = (event) => {
  event.preventDefault()
  console.log('clearBoard was called!')
  $('.box').html('')
  $('.box').removeClass('stay-red')
  $('.box').removeClass('stay-blue')
  counter = 1
  // $('h1').html('Tic-Tac-Toe')
  //   onCreateGame()
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
  clearBoard,
  onUpdateGame
}
