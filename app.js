const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const rootRouter = require('./API/routes')
const { errorHandler } = require('./error-handling/errorHandler')
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log('Time: ', Date(Date.now()))
  next()
})
app.use((err, req, res, next) => {
  if (err) {
    errorHandler(err)
    return res.status(500).send('Something broke!')
  }
  //next()
})

app.use('/', rootRouter)

module.exports = app
