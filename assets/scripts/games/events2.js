// const ui = require('./ui.js')
// const api = require('./api.js')
// const store = require('../store.js')
//
// const turnTracker = function (turn) {
//   if (turn === 'X') {
//     // console.log('from turnTracker: it is now turnX')
//     return true
//   } else if (turn === 'O') {
//     // console.log('from turnTracker: it is now turnO')
//     return false
//   }
// }
//
// const whoseTurn = function (param) {
//   let turnTrackerValue
//   if (param !== undefined) {
//     turnTrackerValue = turnTracker(param)
//   }
//   return turnTrackerValue
// }
//
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
//
// const didYouWin = (gameArray) => {
//   if (winOptions(gameArray)) {
//     $('#user-feedback').html('Game Over! Press Reset to start a new game!')
//   }
// }
//
// const onCreateGame = (event) => {
//   event.preventDefault()
//   api.createGame()
//     .then(ui.createGameSuccess)
//     .then(turnTracker('X'))
//     .catch(ui.failure)
// }
//
// const onUpdateGame = (event) => {
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
//   console.log(store)
//   console.log(store.gameId)
//   console.log(newMove)
//   api.updateGame(store.gameId, newMove)
//     .then(ui.updateGameSuccess)
//     .then(didYouWin)
//     .catch(ui.failure)
//   console.log(didYouWin())
// }
//
// const turnX = (event) => {
//   if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
//     $(event.target).addClass('stay-red')
//     $(event.target).html('X')
//     onUpdateGame(event)
//     whoseTurn('O')
//     $('#user-feedback').html('Now it\'s O\'s turn!')
//     console.log('turnX ran!')
//     console.log(turnTracker())
//   } else {
//     ui.failure()
//   }
// }
//
// const turnO = (event) => {
//   if ($(event.target).html() !== 'X' && $(event.target).html() !== 'O') {
//     $(event.target).addClass('stay-blue')
//     $(event.target).html('O')
//     onUpdateGame(event)
//     whoseTurn('X')
//     $('#user-feedback').html('Now it\'s X\'s turn!')
//     console.log('turnO ran!')
//     console.log(turnTracker())
//   } else {
//     ui.failure()
//   }
// }
//
// const onClick = (event) => {
//   event.preventDefault()
//   if (whoseTurn() === false) {
//     turnO(event)
//   } else if (whoseTurn() === 1) {
//     turnX(event)
//   }
// }
//
// const clearBoard = (event) => {
//   event.preventDefault()
//   $('.box').html('')
//   $('.box').removeClass('stay-red')
//   $('.box').removeClass('stay-blue')
//   $('h1').html('Tic-Tac-Toe')
//   onCreateGame()
// }
//
// module.exports = {
//   turnTracker,
//   showAccountPage,
//   showGamePage,
//   onMouseEnter,
//   onMouseLeave,
//   onCreateGame,
//   onUpdateGame,
//   turnX,
//   turnO,
//   onClick,
//   winOptions,
//   didYouWin,
//   clearBoard,
//   onGetGames,
//   onGetGame
// }
