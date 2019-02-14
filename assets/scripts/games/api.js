const config = require('./config.js')
const store = require('./store.js')

const createGame = (formData) => {
  return $.ajax({
    url: config.apiUrl + `/games`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const updateGame = (formData) => {
  return $.ajax({
    url: config.apiUrl + `/games/${ID}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

// send info to store.js
// get id #
module.exports = {
  createGame,
  updateGame
}
