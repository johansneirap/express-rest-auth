const fieldValidations = require('./fieldValidator')
const jwtValidations = require('./jwtValidator')
const roleValidations = require('./isAdminRole')

module.exports = {
  ...fieldValidations,
  ...jwtValidations,
  ...roleValidations
}
