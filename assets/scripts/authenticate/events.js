const getFormFields = require('../../../lib/get-form-fields.js')
const authApi = require('./api.js')
const authUi = require('./ui.js')

const onSignUp = () => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)

  authApi.signUp(data)
    .then(authUi.signUpSuccess)
    .catch(authUi.failure)

  console.log('all my code is finished')
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  addHandlers
}
