function WebController(model) {
  this.model = model
}

WebController.prototype.get = function (id) {
  return (id) ? this.model.findById(id) : this.model.findAll()
}

WebController.prototype.create = function (element) {
  return this.model.create(element)
}

WebController.prototype.update = function (id, element) {
  return this.model.findById(id)
    .then(data => {
      Object.keys(data.dataValues).forEach(key => {
        if(key !== 'id' && element[key])
          data[key] = element[key]
      })
      return data.save()
    })
}

WebController.prototype.remove = function (id) {
  return this.model.findById(id)
    .then(element => element.destroy())
}

module.exports = WebController
