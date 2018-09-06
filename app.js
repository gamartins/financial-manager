var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var purchaseRouter = require('./routes/purchase')
var loanRouter = require('./routes/loan')
var userRouter = require('./routes/user')
var authRouter = require('./routes/auth')

var app = express()

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/purchases', purchaseRouter)
app.use('/loans', loanRouter)
app.use('/users', userRouter)
app.use('/login', authRouter)

module.exports = app
