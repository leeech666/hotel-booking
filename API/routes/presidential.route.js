const express = require('express')
const router = express.Router()

const {
  postReservation,
  getReservation,
  deleteReservation,
} = require('../controllers/presidential.controller')

let reservations = [{ id: 123456 }]
router.get('/', (req, res) => {
  res.json('Welcome to Book Your Favorate Presidential Suite!')
})

router.post('/', postReservation)

router.get('/:clientID', getReservation)

router.delete('/:clientID', deleteReservation)

module.exports = router
