const getFormFields = require('../../../lib/get-form-fields.js')
const authApi = require('./api.js')
const authUi = require('./ui.js')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)

  authApi.signUp(data)
    .then(authUi.signUpSuccess)
    .catch(authUi.failure)

  console.log('all my code is finished')
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)

  authApi.signIn(data)
    .then(authUi.signInSuccess)
    .catch(authUi.failure)

  console.log('all my code is finished')
}

const onSignOut = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)

  authApi.signOut(data)
    .then(authUi.signOutSuccess)
    .catch(authUi.failure)

  console.log('all my code is finished')
}

// const onChangePassword = () => {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   console.log(data)
//
//   authApi.signUp(data)
//     .then(authUi.signUpSuccess)
//     .catch(authUi.failure)
//
//   console.log('all my code is finished')
// }

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
}

module.exports = {
  addHandlers
}
