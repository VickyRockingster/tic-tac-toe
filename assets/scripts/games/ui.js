const createGameGrid = function () {
  const gridRow1 = [null, null, null]
  const gridRow2 = [null, null, null]
  const gridRow3 = [null, null, null]

  const addGridRows = (array, id) => {
    for (let i = 0; i < array.length; i++) {
  	let gridBox = document.createElement('div')
  	gridBox.setAttribute('box-id', i);
  	gridBox.addEventListener('click', myTurn)
  	document.getElementById('id').appendChild(gridBox)
  }
  addGridRows(gridRow1, "grid-row-one")
  addGridRows(gridRow2, "grid-row-two")
  addGridRows(gridRow3, "grid-row-three")

  const grid = gridRow1.concat(gridRow2).concat(gridRow3)
  return grid
}

const updateGameSuccess = function (responseData) {
  const game = responseData.game
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
  createGameGrid,
  updateGameSuccess,
  failure
}
