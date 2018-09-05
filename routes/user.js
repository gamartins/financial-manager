var express = require('express')
var router = express.Router()

const userCtrl = require('../controllers/user')

router.get('/', (req, res, next) => {
  userCtrl.get()
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error))
})

router.get('/:id', (req, res, next) => {
  userCtrl.get(req.params.id)
    .then(data => (data) ? res.send(data) : res.status(404).send())
    .catch(error => res.status(500).send(error))
})

router.post('/', (req, res, next) => {
  userCtrl.create(req.body)
    .then(data => res.status(201).send(data))
    .catch(error => res.send(error))
})

router.put('/:id', (req, res, next) => {
  userCtrl.update(req.params.id, req.body)
    .then(data => res.send(data))
    .catch(error => res.send(error))
})

router.delete('/:id', (req, res, next) => {
  userCtrl.remove(req.params.id)
    .then(() => res.status(204).send())
    .catch(error => res.send(error))
})

module.exports = router
