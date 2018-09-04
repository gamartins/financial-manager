const loanModel = require('../models/loans')

module.exports = {
  get: (id = null) => {
    if(id)
      return loanModel.findById(id)  
    else
      return loanModel.findAll()
  },

  create: (loan) => {
    return loanModel.create(loan)
  },

  update: (id, loan) => {
    return loanModel.findById(id)
      .then(data => {
        data.name = loan.name,
        data.description = loan.description,
        data.price = loan.price
        return data.save()
      })
  },

  remove: (id) => {
    return loanModel.findById(id)
      .then(loan => loan.destroy())
  }
}