const store = require('../store.js')

const getGamesSuccess = function (data) {
  store.games = data.games
  $('#user-feedback').html('These are all the games you\'ve played!')
}

const getGameSuccess = function (data) {
  // store.game = data.game
  $('#user-feedback').html('This is your most recent game.')
}

const createGameSuccess = function (data) {
  store.game = data.game
  console.log(JSON.stringify(data))
  $('#user-feedback').html('Good luck on your game!')
}

const updateGameSuccess = function (data) {
  store.game = data.game // const game = store.data
  console.log(JSON.stringify(data))
// const bookHtml = (`
  //   <h2>Title: ${book.title}</h2>
  //   <h3>Author: ${book.author}</h3>
  //   <p>ID: ${book.id}</p>
  //   `)
  // $('#book-display').html(bookHtml)
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
