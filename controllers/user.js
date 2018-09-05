const WebController = require('./webController')
const userModel = require('../models/users')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 3

const userController = new WebController(userModel)

userController.create = function(user) {
  return bcrypt.hash(user.password, SALT_ROUNDS).then(hash => {
    user.password = hash
    return this.model.create(user)
  })
}

module.exports = userController
