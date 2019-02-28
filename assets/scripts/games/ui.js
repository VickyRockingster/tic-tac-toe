const store = require('../store.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const getGamesSuccess = function (data) {
  const games = data
  $('#user-feedback').html('These are all the games you\'ve played!')
  $('#display-games').html('')
//   responseData.books.forEach(book => {
//     const bookHtml = (`
//     <h2>Title: ${book.title}</h2>
//     <h3>Author: ${book.author}</h3>
//     <p>ID: ${book.id}</p>
//     <br>
//     `)
//     $('#book-display').append(bookHtml)
//   })
}

const getGameSuccess = function (data) {
  const game = data
  $('#user-feedback').html('This is your most recent game.')
}
// const book = responseData.book
//   const bookHtml = (`
//     <h2>Title: ${book.title}</h2>
//     <h3>Author: ${book.author}</h3>
//     <p>ID: ${book.id}</p>
//     `)
//   $('#book-display').html(bookHtml)

const createGameSuccess = function (data) {
  const game = data
  store.game = game
  const gameId = store.game.game.id
  store.gameId = gameId
  $('#user-feedback').html('Good luck on your game!')
  $('#user-feedback').addClass('error')
  setTimeout(() => {
    $('#user-feedback').html('')
    $('#user-feedback').removeClass('error')
  }, 3000)
  console.log('createGameSuccess ran!')
  return gameId
}

const updateGameSuccess = function (data) {
  const game = data
  store.game = game
  const gameId = store.game.game.id
  store.gameId = gameId
  console.log('The following info is from updateGameSuccess:')
  console.log('store.gameId:' + store.gameId)
  console.log('store:' + store)
  console.log(JSON.stringify('data:' + data))
  console.log(JSON.stringify('store.game:' + store.game))
  console.log(JSON.stringify('store.game.cells:' + store.game.cells))
  const gameArray = store.game.cells
  console.log('from uodateGameSuccess, gameArray:' + gameArray)
  console.log('from uodateGameSuccess, store:' + store)
  return gameArray
}

const failure = function () {
  $('#user-feedback').html('Something went wrong, please try again.')
  $('#user-feedback').addClass('error')
  setTimeout(() => {
    $('#user-feedback').html('')
    $('#user-feedback').removeClass('error')
  }, 3000)
}

module.exports = {
  getGamesSuccess,
  getGameSuccess,
  createGameSuccess,
  updateGameSuccess,
  failure
}
