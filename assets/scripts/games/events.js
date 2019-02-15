const ui = require('./ui.js')
const api = require('./api.js')

function myTurn (event) {
  event.preventDefault()

  const counter = 0
  if (counter % 2 === 1) {
    turnX()
  } else if (counter % 2 === 0 && counter !== 0) {
    turnO()
  }
}

const turnX = (event) => {
  event.preventDefault()
  if (event === 'mouseover') {
    $('.box').addClass('turn-red')
  } else if (event === 'click') {
    let counter = 1
    $('.box').addClass('turn-x')
    $('.box').setAttribute('src', '#')
    counter += 1
  }
}
const turnO = (event) => {
  event.preventDefault()
  if (event === 'mouseover') {
    $('.box').addClass('turn-blue')
  } else if (event === 'click') {
    let counter = 1
    $('.box').addClass('turn-o')
    $('.box').setAttribute('src', '#')
    counter += 1
  }
}

const clearBoard = () => {}

// const createGameGrid = () => {
//   const gridRow1 = [null, null, null]
//   const gridRow2 = [null, null, null]
//   const gridRow3 = [null, null, null]
//
//   const addGridRows = (array, id) => {
//     for (let i = 0; i < array.length; i++) {
//       const gridBox = document.createElement('div')
//       gridBox.setAttribute('box-id', i)
//       gridBox.addEventListener('click', myTurn)
//       document.getElementById('id').appendChild(gridBox)
//     }
//   }
//   addGridRows(gridRow1, 'grid-row-one')
//   addGridRows(gridRow2, 'grid-row-two')
//   addGridRows(gridRow3, 'grid-row-three')

//   const grid = gridRow1.concat(gridRow2).concat(gridRow3)
// }

module.exports = {
  myTurn,
  clearBoard
}
