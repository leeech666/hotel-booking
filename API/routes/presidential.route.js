const express = require('express')
const router = express.Router()

const {
  postReservation,
  getReservation,
  deleteReservation,
} = require('../controllers/presidential.controller')

router.get('/', (req, res) => {
  res.json('Welcome to Book the Presidential Suite!')
})

router.post('/', postReservation)

router.get('/:clientID', getReservation)

router.delete('/:clientID', deleteReservation)

module.exports = router
