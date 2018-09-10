var bcrypt = require('bcrypt')
var express = require('express')
var router = express.Router()

const authCtrl = require('../controllers/auth')
const userCtrl = require('../controllers/user')

router.post('/', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  userCtrl.findByEmail(email).then(user => {
    if(!user) {
      res.status(404).send({ message: 'User not found.'})
      return
    }

    const isPasswordValid = bcrypt.compareSync(password, user.dataValues.password)
    if(isPasswordValid)
      userCtrl.get(user.dataValues.id).then(user => {
        const token = authCtrl.getToken(user.dataValues.id)
        res.status(200).send({ token: token })
      })
    else
      res.status(401).send({ message: 'Unauthorized' })
  })
})

module.exports = router
