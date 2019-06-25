const store = require('../store.js')
// const getFormFields = require('../../../lib/get-form-fields.js')

const getGamesSuccess = function (data) {
  store.games = data.games
  $('#user-feedback').html(`You have played ${store.games.length} games!`)
}

const getGameSuccess = function (data) {
  store.lastGame = data.game
  $('#user-feedback').html(`Your most recent game is: ${store.lastGame.id}.`)

  // store.recentGame = data.game
  // $('#user-feedback').html(`Your most recent game is: ${store.recentGame.id}.`)
}

const createGameSuccess = function (data) {
  store.currentGame = data.game
  $('#user-feedback').html('Good luck on your game!')
  setTimeout(() => {
    $('#user-feedback').html('')
  }, 3000)
  return store.currentGame.id
}

const updateGameSuccess = function (data) {
  store.currentGame = data.game
  const gameArray = store.currentGame.cells
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
