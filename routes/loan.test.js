const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiLike = require('chai-like')

chai.use(chaiHttp)
chai.use(chaiLike)

const expect = chai.expect
const loanModel = require('../models/loans')

describe ('Loan Route', () => {

  beforeEach((done) => {
    loanModel.destroy({ truncate: true }).then(() => done())
  })

  after((done) => {
    loanModel.destroy({ truncate: true }).then(() => done())
  })

  it ('should return a list of loans', (done) => {
    chai.request(app).get('/loans').end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      done()
    })
  })

  it ('should search a loan by id', (done) => {
    loanModel.create({
      name: "Anariana",
      description: "Um coisa que ela comprou",
      price: 49.90
    }).then(() => {
      chai.request(app).get('/loans/1').end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        done()
      })
    })
  });

  it ('should return not found when loan with id not exist', (done) => {
    chai.request(app).get(`/loans/1`).end((err, res) => {
      expect(res).to.have.status(404)
      expect(res.body).to.be.empty
      done()
    })
  });

  it ('should create an object', (done) => {
    const loan = {
      name: "Anariana",
      description: "Uma coisa que ela comprou",
      price: 49.90
    }

    chai.request(app)
      .post('/loans')
      .send(loan)
      .end((err, res) => {
        expect(res).to.have.status(201)
        expect(res).to.be.an('object')
        expect(res.body).to.be.like(loan)
        done()
      })
  })

  it ('should update an object', (done) => {
    const loan = {
      name: "Anariana",
      description: "Uma coisa que ela comprou",
      price: 49.90
    }

    const loanUpdated = {
      name: "Linda",
      description: "Uma coisa que ela comprou",
      price: 39.90
    }

    loanModel.create(loan).then(loan => {
      const loanId = loan.dataValues.id
      chai.request(app)
        .put(`/loans/${loanId}`)
        .send(loanUpdated)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.like(loanUpdated)
          done()
      })
    })
  });

  it ('should remove an object', (done) => {
    loanModel.create({
      name: "Anariana",
      description: "Uma coisa que ela comprou",
      price: 49.90
    }).then(loan => {
      const loanId = loan.dataValues.id
      chai.request(app)
        .del(`/loans/${loanId}`)
        .end((err, res) => {
          expect(res).to.have.status(204)
          expect(res.body).to.be.empty
          done()
      })
    })
  });

})