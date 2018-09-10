const authCtrl = require('../controllers/auth')
const userCtrl = require('../controllers/user')

const isLogged = (req, res, next) => {
  const authorization = req.headers['authorization']

  if(!authorization)
    res.status(401).send({ message: 'Unauthorized' })

  const id = authCtrl.checkToken(authorization).id

  if(!id)
    res.status(401).send({ message: 'Invalid authorization' })

  userCtrl.get(id).then(data => {
    res.locals.user = data.dataValues
    next()
  })
}

module.exports = isLogged