const WebController = require('./webController')
const loanModel = require('../models/loans')

const webController = new WebController(loanModel)

module.exports = webController
