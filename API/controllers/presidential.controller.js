const { errorHandler } = require('../../error-handling/errorHandler')
const { isValid } = require('../../utils/isValid')
const { clientID } = require('../../model/reservation')

let reservations = [
  {
    first_name: 'cell',
    last_name: 'kou',
    number_people: '2',
    check_in: '2-20-1800',
    check_out: '2-22-1800',
    email: 'lll@rrr.com',
    id: 'cell1651326887522',
  },
]

const postReservation = async (req, res) => {
  try {
    let q = req.body
    let result = await isValid(q, reservations)
    if (result.error) {
      throw result
    }

    reservations.push(result)
    let response = {
      reservation: result,
      info: `please use your reservation id to retrieve (GET) or cancel (DELETE) your reservation; endpoint=/presidential_reservation/${result.id}`,
    }
    res.status(201).json(response)
  } catch (e) {
    errorHandler(e.error)
    if (e.code) {
      return res.status(e.code).json(e.error)
    }
    res.status(400).json(e)
  }
}

const getReservation = async (req, res) => {
  try {
    const id = req.params.clientID

    let aa = clientID.validate(id)
    if (aa.error) {
      throw aa.error
    }

    const client = await reservations.find((client) => client.id == id)
    if (!client) {
      throw { error: `Reservation(${id}) not found` }
    }
    res.status(200).json(client)
  } catch (e) {
    errorHandler(e)

    res.status(404).json(e)
  }
}

const deleteReservation = async (req, res) => {
  try {
    const id = req.params.clientID
    let aa = clientID.validate(id)

    if (aa.error) {
      throw aa.error
    }
    const index = await reservations.findIndex((client) => client.id == id)
    if (index === -1) {
      throw { error: `Reservation(${id}) not found` }
    }
    reservations.splice(index, 1)
    res.status(204).json(`Reservation(${id}) Cancelled`)
  } catch (e) {
    errorHandler(e)

    res.status(404).json(e)
  }
}

module.exports = { postReservation, getReservation, deleteReservation }
