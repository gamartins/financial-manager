const WebController = require('./webController')
const purchaseModel = require('../models/purchase')

const webController = new WebController(purchaseModel)

module.exports = webController
