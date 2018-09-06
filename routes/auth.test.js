const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect
const userModel = require('../models/users')
const userCtrl = require('../controllers/user')

describe ('Auth Route', () => {

  before((done) => {
    userCtrl.create({
      name: 'Gabriel Angelo',
      email: 'gabriel@email.com',
      password: '123123'
    }).then(() => done())
  })
  
  after((done) => {
    userModel.destroy({ truncate: true }).then(() => done())
  })

  it ('should login and get token', (done) => {
    chai.request(app).post('/login').send({
      email: 'gabriel@email.com', password: '123123'
    }).end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body.token).to.exist
      done()
    })
  })

  it ('should return unauthorized when email or password invalid', (done) => {
    chai.request(app).post('/login').send({
      email: 'gabriel@email.com', password: 'wrong_password'
    }).end((err, res) => {
      expect(res).to.have.status(401)
      expect(res.body.token).to.not.exist
      done()
    })
  });

})