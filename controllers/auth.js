var jwt = require('jsonwebtoken')

const env = process.env.NODE_ENV || 'development'
const config = require('../environment/environment')[env]

module.exports = {
  checkToken: function(token) {
    return jwt.verify(token, config.secret, (err, decoded) => {
      if(err)
        return err
      else
        return { id: decoded.id }
    })
  },

  getToken: function(id) {
    return jwt.sign({ id: id }, config.secret, { expiresIn: 86400 })
  }
}