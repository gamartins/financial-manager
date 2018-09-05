const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiLike = require('chai-like')

chai.use(chaiHttp)
chai.use(chaiLike)

const expect = chai.expect
const userModel = require('../models/users')

describe ('User Route', () => {
  
  beforeEach((done) => {
    userModel.destroy({ truncate: true }).then(() => done())
  })
  
  after((done) => {
    userModel.destroy({ truncate: true }).then(() => done())
  })

  it ('should return a list of users', (done) => {
    chai.request(app).get('/users').end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      done()
    })
  })

  it ('should search a user by id', (done) => {
    userModel.create({
      name: "Gabriel Martins",
      email: "gabriel@email.com",
      password: "123123"
    }).then(() => {
      chai.request(app).get('/users/1').end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  it ('should not return return the password in get by id', (done) => {
    userModel.create({
      name: "Gabriel Martins",
      email: "gabriel@email.com",
      password: "123123"
    }).then(() => {
      chai.request(app).get('/users/1').end((err, res) => {
        expect(res.body.password).to.be.undefined
        done()
      })
    })
  })

  it ('should return not found when user with id not exist', (done) => {
    chai.request(app).get(`/users/1`).end((err, res) => {
      expect(res).to.have.status(404)
      expect(res.body).to.be.empty
      done()
    })
  })

  it ('should create an object', (done) => {
    const user = { name: "Gabriel Martins", email: "gabriel@email.com", password: "123123" }
    const expectedUser = { name: "Gabriel Martins", email: "gabriel@email.com" }

    chai.request(app)
      .post('/users')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201)
        expect(res).to.be.an('object')
        expect(res.body).to.be.like(expectedUser)
        done()
      })
  })

  it ('should update an object', (done) => {
    const user = {
      name: "Gabriel Martins",
      email: "gabriel@email.com", 
      password: "123123"
    }

    const userUpdated = {
      name: "Gabriel Angelo",
      email: "gabriel@gmail.com"
    }

    userModel.create(user).then(user => {
      const userId = user.dataValues.id
      chai.request(app)
        .put(`/users/${userId}`)
        .send(userUpdated)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.like(userUpdated)
          done()
      })
    })
  })

  it ('should remove an object', (done) => {
    userModel.create({
      name: "Gabriel Martins",
      email: "gabriel@email.com", 
      password: "123123" })
    .then(user => {
      const userId = user.dataValues.id
      chai.request(app)
        .del(`/users/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(204)
          expect(res.body).to.be.empty
          done()
      })
    })
  })

})