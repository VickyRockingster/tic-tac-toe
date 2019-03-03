const config = require('../config.js')
const store = require('../store.js')

const getGames = () => {
  return $.ajax({
    url: config.apiUrl + `/games`,
    method: 'GET',
    // contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getGame = (ID) => {
  return $.ajax({
    url: config.apiUrl + `/games${ID}`,
    method: 'GET',
    // contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createGame = () => {
  return $.ajax({
    url: config.apiUrl + `/games`,
    method: 'POST',
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: '{}'
  })
}

const updateGame = (id, newMove) => {
  console.log('updateGame ran!')
  return $.ajax({
    url: config.apiUrl + `/games/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: newMove
  })
}

// const newMove = (index, value, over) => {
//   return $.ajax({
//     url: config.apiUrl + '/games/' + store.gameID,
//     method: 'PATCH',
//     headers: { Authorization: 'Token token=' + store.user.token },
//     data: {
//       game: {
//         cell: {
//           index: index,
//           value: value
//         },
//         over: over
//       }
//     }
//   }
//   )
// }
module.exports = {
  getGames,
  getGame,
  createGame,
  updateGame
}
