const express = require('express')
const rootRouter = express.Router()
const presidentialRoutes = require('./presidential.route')

rootRouter.get('/', (req, res) => {
  res.send('Welcome to Book Your Favorate Suite!')
})

//route for booking presidential suite
rootRouter.use('/presidential_reservation', presidentialRoutes)

rootRouter.use('/*', (req, res) => {
  res.status(400).json('endpoint not existing')
})
module.exports = rootRouter
