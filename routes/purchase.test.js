const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiLike = require('chai-like')

chai.use(chaiHttp)
chai.use(chaiLike)

const expect = chai.expect
const purchaseModel = require('../models/purchase')

describe ('Purchase Route', () => {
  
  beforeEach((done) => {
    purchaseModel.destroy({ truncate: true }).then(() => done())
  })
  
  after((done) => {
    purchaseModel.destroy({ truncate: true }).then(() => done())
  })

  it ('should return a list of purchases', (done) => {
    chai.request(app).get('/purchases').end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      done()
    })
  })

  it ('should search a purchase by id', (done) => {
    purchaseModel.create({
      date: "4/ago",
      description: "Carrefour",
      type: "Terceiros",
      price: 1,
      installments: 1,
      observations: ""
    }).then(() => {
      chai.request(app).get('/purchases/1').end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        done()
      })
    })
  });

  it ('should return not found when purchase with id not exist', (done) => {
    chai.request(app).get(`/purchase/1`).end((err, res) => {
      expect(res).to.have.status(404)
      expect(res.body).to.be.empty
      done()
    })
  });

  it ('should create an object', (done) => {
    const purchase = {
      date: "4/ago",
      description: "Carrefour",
      type: "Terceiros",
      price: 1,
      installments: 1,
      observations: ""
    }

    chai.request(app)
      .post('/purchases')
      .send(purchase)
      .end((err, res) => {
        expect(res).to.have.status(201)
        expect(res).to.be.an('object')
        expect(res.body).to.be.like(purchase)
        done()
      })
  })

  it ('should update an object', (done) => {
    const purchase = {
      date: "4/ago",
      description: "Carrefour",
      type: "Terceiros",
      price: 1,
      installments: 1,
      observations: ""
    }

    const purchaseUpdated = {
      date: "4/ago",
      description: "Carrefour",
      type: "Terceirossss",
      price: 1,
      installments: 2,
      observations: ""
    }

    purchaseModel.create(purchase).then(purchase => {
      const purchaseId = purchase.dataValues.id
      chai.request(app)
        .put(`/purchases/${purchaseId}`)
        .send(purchaseUpdated)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.like(purchaseUpdated)
          done()
      })
    })
  });

  it ('should remove an object', (done) => {
    purchaseModel.create({
      date: "4/ago",
      description: "Carrefour",
      type: "Terceiros",
      price: 1,
      installments: 1,
      observations: ""
    }).then(purchase => {
      const purchaseId = purchase.dataValues.id
      chai.request(app)
        .del(`/purchases/${purchaseId}`)
        .end((err, res) => {
          expect(res).to.have.status(204)
          expect(res.body).to.be.empty
          done()
      })
    })
  });

})