const getFormFields = require('../../../lib/get-form-fields.js')
const authApi = require('./api.js')
const authUi = require('./ui.js')

const onSignUp = (event) => {
  event.preventDefault()

  // format sign up input data to send to the api
  const credentials = getFormFields(event.target)

  authApi.signUp(credentials)
    .then(() => authApi.signIn)
    .then(authUi.signInSuccess)
    .catch(authUi.failure)
}

const onSignIn = (event) => {
  event.preventDefault()

  // format sign in input data to send to the api
  const credentials = getFormFields(event.target)

  authApi.signIn(credentials)
    .then(authUi.signInSuccess)
    .catch(authUi.failure)
}

const onSignOut = (event) => {
  event.preventDefault()

  // format sign out input data to send to the api
  const credentials = getFormFields(event.target)

  authApi.signOut(credentials)
    .then(authUi.signOutSuccess)
    .catch(authUi.failure)
}

const onChangePassword = (event) => {
  event.preventDefault()

  // format password change input data to send to the api
  const passwords = getFormFields(event.target)

  authApi.changePassword(passwords)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.failure)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
}

module.exports = {
  addHandlers
}
