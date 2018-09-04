const Sequelize = require('sequelize')
const sequelize = require('.')

const Purchase = sequelize.define('purchase', {
  date: Sequelize.STRING,
  description: Sequelize.STRING,
  type: Sequelize.STRING,
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0.01
    }
  },
  installments: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  observations: Sequelize.STRING
})

Purchase.sync()

module.exports = Purchase
