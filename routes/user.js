var express = require('express')
var router = express.Router()

const authMiddleware = require('../middlewares/auth')
const userCtrl = require('../controllers/user')

router.get('/', authMiddleware, (req, res, next) => {
  userCtrl.get(res.locals.user.id)
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error))
})

router.post('/', (req, res, next) => {
  userCtrl.create(req.body)
    .then(data => res.status(201).send(data))
    .catch(error => res.send(error))
})

router.put('/', authMiddleware, (req, res, next) => {
  userCtrl.update(res.locals.user.id, req.body)
    .then(data => res.send(data))
    .catch(error => res.send(error))
})

router.delete('/', authMiddleware, (req, res, next) => {
  userCtrl.remove(res.locals.user.id)
    .then(() => res.status(204).send())
    .catch(error => res.send(error))
})

module.exports = router
