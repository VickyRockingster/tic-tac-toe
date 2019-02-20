const store = require('../store.js')

const getGamesSuccess = function () {}

const getGameSuccess = function () {}

const createGameSuccess = function () {}

const updateGameSuccess = function (data) {
  const game = store.data
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
