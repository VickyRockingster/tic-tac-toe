const config = require('../config.js')
const store = require('../store.js')

const getGames = () => {
  return $.ajax({
    url: config.apiUrl + `/games`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getGame = (ID) => {
  return $.ajax({
    url: config.apiUrl + `/games${ID}`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createGame = () => {
  return $.ajax({
    url: config.apiUrl + `/games`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {}
  })
}

const updateGame = (ID, newMove) => {
  return $.ajax({
    url: config.apiUrl + `/games/${ID}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: newMove
  })
}

// send info to store.js
// get id #
module.exports = {
  getGames,
  getGame,
  createGame,
  updateGame
}
