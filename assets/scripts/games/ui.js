const store = require('../store.js')

const getGamesSuccess = function (data) {
  store.games = data.games

  console.log(store.games)

  const allGames = store.games.length
  let gamesWon = 0
  let gamesLost = 0
  let unfinishedGames = 0
  const gamesTied = allGames - (gamesWon + gamesLost + unfinishedGames)

  data.games.forEach(game => {
    if (game.over === false) {
      unfinishedGames++
    } else if (game.over === true && ((game.cells[0] === game.cells[1] && game.cells[1] === game.cells[2] && game.cells[2] === 'X') ||
    (game.cells[3] === game.cells[4] && game.cells[4] === game.cells[5] && game.cells[5] === 'X') ||
    (game.cells[6] === game.cells[7] && game.cells[7] === game.cells[8] && game.cells[8] === 'X') ||
    (game.cells[0] === game.cells[3] && game.cells[3] === game.cells[6] && game.cells[6] === 'X') ||
    (game.cells[1] === game.cells[4] && game.cells[4] === game.cells[7] && game.cells[7] === 'X') ||
    (game.cells[2] === game.cells[5] && game.cells[5] === game.cells[8] && game.cells[8] === 'X') ||
    (game.cells[0] === game.cells[4] && game.cells[4] === game.cells[8] && game.cells[8] === 'X') ||
    (game.cells[2] === game.cells[4] && game.cells[4] === game.cells[6] && game.cells[6] === 'X'))) {
      gamesWon++
    } else if (game.over === true && ((game.cells[0] === game.cells[1] && game.cells[1] === game.cells[2] && game.cells[2] === 'O') ||
    (game.cells[3] === game.cells[4] && game.cells[4] === game.cells[5] && game.cells[5] === 'O') ||
    (game.cells[6] === game.cells[7] && game.cells[7] === game.cells[8] && game.cells[8] === 'O') ||
    (game.cells[0] === game.cells[3] && game.cells[3] === game.cells[6] && game.cells[6] === 'O') ||
    (game.cells[1] === game.cells[4] && game.cells[4] === game.cells[7] && game.cells[7] === 'O') ||
    (game.cells[2] === game.cells[5] && game.cells[5] === game.cells[8] && game.cells[8] === 'O') ||
    (game.cells[0] === game.cells[4] && game.cells[4] === game.cells[8] && game.cells[8] === 'O') ||
    (game.cells[2] === game.cells[4] && game.cells[4] === game.cells[6] && game.cells[6] === 'O'))) {
      gamesLost++
    }
  })

  console.log(`allGames: ${allGames}`)
  console.log(`gamesWon: ${gamesWon}`)
  console.log(`gamesLost: ${gamesLost}`)
  console.log(`unfinishedGames: ${unfinishedGames}`)
  console.log(`gamesTied: ${gamesTied}`)

  $('#display-games').html('')
  $('#display-games').append(`You have played ${store.games.length} games!`)
  $('#display-games').append(`Games Won: ${gamesWon}`)
  $('#display-games').append(`Games Tied: ${gamesTied}`)

  data.games.forEach(game => {
    const eachGame = (`
      <div>
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
        <h5>Game Over?: ${game.over}</h3>
      <div>
    `)
    $('.box:contains(X)').addClass('stay-red')
    $('.box:contains(O)').addClass('stay-blue')
    $('#display-games').append(eachGame)
  })
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
  createGameSuccess,
  updateGameSuccess,
  failure
}
