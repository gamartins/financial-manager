const Sequelize = require('sequelize')
const sequelize = require('.')

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  defaultScope: {
    attributes: { exclude: [ 'password' ] }
  }
})

User.sync()

module.exports = User
