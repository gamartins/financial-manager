const Sequelize = require('sequelize')
const environment = process.env.NODE_ENV
const config = require('../environment/environment.js')[environment]

const connectionString = `${config.dialect}://${config.username}:${config.password}@${config.host}/${config.database}`
const sequelize = new Sequelize(connectionString, {
  logging: false,
})

module.exports = sequelize
