const Sequelize = require('sequelize')
const sequelize = require('.')

const Loan = sequelize.define('loan', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0.01
    }
  }
})

Loan.sync()

module.exports = Loan
