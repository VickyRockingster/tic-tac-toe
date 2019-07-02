const store = require('../store.js')

// const getFormFields = require('../../../lib/get-form-fields.js')

const getGamesSuccess = function (data) {
  store.games = data.games

  $('#user-feedback').html(`You have played ${store.games.length} games!`)
  $('#display-games').html('')

  data.games.forEach(game => {
    const eachGame = (`
      <h3>Game No.: ${game.id}</h3>
      <div class="container">
        <div class="row">
          <div class="box col-4" data-cell-index="0">${game.cells[0]}</div>
          <div class="box col-4" data-cell-index="1">${game.cells[1]}</div>
          <div class="box col-4" data-cell-index="2">${game.cells[2]}</div>
        </div>
        <div class="row">
          <div class="box col-4" data-cell-index="3">${game.cells[3]}</div>
          <div class="box col-4" data-cell-index="4">${game.cells[4]}</div>
          <div class="box col-4" data-cell-index="5">${game.cells[5]}</div>
        </div>
        <div class="row">
          <div class="box col-4" data-cell-index="6">${game.cells[6]}</div>
          <div class="box col-4" data-cell-index="7">${game.cells[7]}</div>
          <div class="box col-4" data-cell-index="8">${game.cells[8]}</div>
        </div>
      </div>
      <p>Game Over?: ${game.over}</p>
      <form>
        <button class="btn mx-3 text-uppercase get-game-button data-cell-index="${game.id}"
        type="submit">Finish Game</button>
      <form>
    `)
    $('#display-games').append(eachGame)
  })
}

const getGameSuccess = function (data) {
  store.lastGame = data.game
  $('#user-feedback').html(`Your most recent game is: ${store.lastGame.id}.`)

  $('.display').html('')
  const oneGame = (`
    <h3>Game No.: ${store.lastGame.id}</h3>
    <div class="container">
      <div class="row">
        <div class="box col-4" data-cell-index="0">${store.lastGame.cells[0]}</div>
        <div class="box col-4" data-cell-index="1">${store.lastGame.cells[1]}</div>
        <div class="box col-4" data-cell-index="2">${store.lastGame.cells[2]}</div>
      </div>
      <div class="row">
        <div class="box col-4" data-cell-index="3">${store.lastGame.cells[3]}</div>
        <div class="box col-4" data-cell-index="4">${store.lastGame.cells[4]}</div>
        <div class="box col-4" data-cell-index="5">${store.lastGame.cells[5]}</div>
      </div>
      <div class="row">
        <div class="box col-4" data-cell-index="6">${store.lastGame.cells[6]}</div>
        <div class="box col-4" data-cell-index="7">${store.lastGame.cells[7]}</div>
        <div class="box col-4" data-cell-index="8">${store.lastGame.cells[8]}</div>
      </div>
    </div>
   `)
  $('#display-games').append(oneGame)

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
