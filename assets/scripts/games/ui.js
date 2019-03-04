const store = require('../store.js')
// const getFormFields = require('../../../lib/get-form-fields.js')

const getGamesSuccess = function (data) {
  store.games = data.games
  $('#user-feedback').html('These are all the games you\'ve played!')
  $('#display-games').html(JSON.stringify(store.games))
//  $('.account').addClass('hidden')
}

const getGameSuccess = function (data) {
  store.recentGame = data.game
  $('#user-feedback').html('This is your most recent game!')
  $('#display-games').html(JSON.stringify(store.recentGame))
  console.log('from getGameSuccess-data: ' + data)
  console.log('from getGameSuccess-data.game: ' + data.game)
  console.log('from getGameSuccess-store.recentGame ' + store.recentGame)
}

const createGameSuccess = function (data) {
  store.currentGame = data.game
  $('#user-feedback').html('Good luck on your game!')
  $('#user-feedback').addClass('stay-blue')
  setTimeout(() => {
    $('#user-feedback').html('')
    $('#user-feedback').removeClass('stay-blue')
  }, 3000)
  console.log('from createGameSuccess-store.currentGame: ' + (store.currentGame))
  console.log('from createGameSuccess-store.currentGame.id: ' + store.currentGame.id)
  return store.currentGame.id
}

const updateGameSuccess = function (data) {
  store.currentGame = data.game
  const gameArray = store.currentGame.cells
  store.gameArray = gameArray
  console.log('from updateGameSuccess, gameArray:' + (gameArray))
  console.log('from updateGameSuccess, type of gameArray:' + (Array.isArray(gameArray)))
  console.log('from updateGameSuccess, store.currentGame.cells:' + store.currentGame.cells)
  console.log('from updateGameSuccess, store.currentGame.over:' + store.currentGame.over)
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
