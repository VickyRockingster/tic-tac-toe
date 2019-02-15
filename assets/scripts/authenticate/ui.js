const signUpSuccess = function () {
  $('#user-feedback').text('You are now signed up!')
  $('#sign-up').trigger('reset')
}

const failure = function () {
  $('#user-feedback').text('There was an error processing your request. Please try again.')
  $('#sign-up').trigger('reset')
}

module.exports = {
  signUpSuccess,
  failure
}
