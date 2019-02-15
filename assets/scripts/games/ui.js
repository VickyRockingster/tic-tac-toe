// const api = require('./api.js')

const updateGameSuccess = function (responseData) {
// const game = responseData.game
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
  }, 5000)
}

module.exports = {
  updateGameSuccess,
  failure
}
