const store = require('../store.js')

// const getFormFields = require('../../../lib/get-form-fields.js')

const getGamesSuccess = function (data) {
  store.games = data.games

  $('#display-games').html('')
  $('#display-games').append(`You have played ${store.games.length} games!`)

  data.games.forEach(game => {
    const eachGame = (`
      <h3>Game No.: ${game.id}</h3>
      <div class="container">
        <div class="row">
          <div class="box col-4" data-cell-index="0" value=${game.cells[0]}>${game.cells[0]}</div>
          <div class="box col-4" data-cell-index="1" value=${game.cells[1]}>${game.cells[1]}</div>
          <div class="box col-4" data-cell-index="2" value=${game.cells[2]}>${game.cells[2]}</div>
        </div>
        <div class="row">
          <div class="box col-4" data-cell-index="3" value=${game.cells[3]}>${game.cells[3]}</div>
          <div class="box col-4" data-cell-index="4" value=${game.cells[4]}>${game.cells[4]}</div>
          <div class="box col-4" data-cell-index="5" value=${game.cells[5]}>${game.cells[5]}</div>
        </div>
        <div class="row">
          <div class="box col-4" data-cell-index="6" value=${game.cells[6]}>${game.cells[6]}</div>
          <div class="box col-4" data-cell-index="7" value=${game.cells[7]}>${game.cells[7]}</div>
          <div class="box col-4" data-cell-index="8" value=${game.cells[8]}>${game.cells[8]}</div>
        </div>
      </div>
    `)
    $('#display-games').append(eachGame)
    // $('.box').css('background-color', 'red')
    // $('.box').addClass('stay-red')
    console.log($('.box').html())

    // if ($('.box').html() === 'X') {
    // const index = $('.box').data('cell-index')
    // $('.box').html(index, $.addClass('stay-red'))
    // }
  })
}

// const getGameSuccess = function (data) {
//   store.lastGame = data.game
//   $('#user-feedback').html(`Your most recent game is: ${store.lastGame.id}.`)
//
//   $('#display-games').html('')
//   const oneGame = (`
//     <h3>Game No.: ${store.lastGame.id}</h3>
//     <div class="container">
//       <div class="row">
//         <div class="box col-4" data-cell-index="0">${store.lastGame.cells[0]}</div>
//         <div class="box col-4" data-cell-index="1">${store.lastGame.cells[1]}</div>
//         <div class="box col-4" data-cell-index="2">${store.lastGame.cells[2]}</div>
//       </div>
//       <div class="row">
//         <div class="box col-4" data-cell-index="3">${store.lastGame.cells[3]}</div>
//         <div class="box col-4" data-cell-index="4">${store.lastGame.cells[4]}</div>
//         <div class="box col-4" data-cell-index="5">${store.lastGame.cells[5]}</div>
//       </div>
//       <div class="row">
//         <div class="box col-4" data-cell-index="6">${store.lastGame.cells[6]}</div>
//         <div class="box col-4" data-cell-index="7">${store.lastGame.cells[7]}</div>
//         <div class="box col-4" data-cell-index="8">${store.lastGame.cells[8]}</div>
//       </div>
//     </div>
//    `)
//   $('#display-game').append(oneGame)
//
//   // store.recentGame = data.game
//   // $('#user-feedback').html(`Your most recent game is: ${store.recentGame.id}.`)
// }

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
  createGameSuccess,
  updateGameSuccess,
  failure
}
