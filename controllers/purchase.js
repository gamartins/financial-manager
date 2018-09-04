var purchaseModel = require('../models/purchase')

module.exports = {
  get: (id = null) => {
    if(id)
      return purchaseModel.findById(id)  
    else
      return purchaseModel.findAll()
  },

  create: (purchase) => {
    return purchaseModel.create(purchase)
  },

  update: (id, purchase) => {
    return purchaseModel.findById(id)
      .then(data => {
        data.date = purchase.date,
        data.description = purchase.description,
        data.type = purchase.type,
        data.price = purchase.price,
        data.installments = purchase.installments,
        data.observations = purchase.observations
        return data.save()
      })
  },

  remove: (id) => {
    return purchaseModel.findById(id)
      .then(purchase => purchase.destroy())
  }
}