const { errorHandler } = require('../../error-handling/errorHandler')
const { isValid } = require('../../utils/isValid')
const { clientID } = require('../../model/reservation')

let reservations = [{ id: 123456 }]
const postReservation = async (req, res) => {
  
   res.status(200).json("ok")
}

const getReservation = async (req, res) => {
  
  res.status(200).json("ok")
}

const deleteReservation = async (req, res) => {
 
    res.status(200).json("ok")
  }

module.exports = { postReservation, getReservation, deleteReservation }
