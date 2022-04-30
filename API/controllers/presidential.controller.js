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
    info: 'please use your reservation id to enquire or cancel',
  },
]
//let reservations = []
const postReservation = async (req, res) => {
  try {
    let q = req.body
    let result = await isValid(q, reservations)
    if (result.error) {
      throw result.error
    }
    result['info'] = 'please use your reservation id to enquire or cancel'
    reservations.push(result)
    console.log(reservations)
    res.status(201).json(result)
    //res.status(200).json(reservations)
  } catch (e) {
    errorHandler(e)
    //res.status(404).json(e.message ? e.message : 'Oops, something went wrong')
    //res.status(500).json('Oops, something went wrong')
    res.status(400).json(e)
  }
}

const getReservation = async (req, res) => {
  try {
    const id = req.params.clientID
    //const { id } = req.params
    let aa = clientID.validate(id)
    if (aa.error) {
      throw aa.error
    }

    const client = await reservations.find((client) => client.id == id)
    if (!client) {
      errorHandler({ error: `Reservation(${id}) not found` })
      return res.status(404).send(`Reservation(${id}) not found`)
    }
    res.status(200).json(client)
  } catch (e) {
    errorHandler(e)
    // res.status(404).json(e.message ? e.message : 'Oops, something went wrong')
    res.status(404).json(e)
  }
}

const deleteReservation = async (req, res) => {
  try {
    const id = req.params.clientID
    let aa = clientID.validate(id)
    //console.log(aa)
    if (aa.error) {
      throw aa.error
      // errorHandler(aa.error)
      // return res.status(404).json(aa.error.message)
    }
    const index = await reservations.findIndex((client) => client.id == id)
    if (index === -1) {
      errorHandler({ error: `Reservation(${id}) not found` })
      return res.status(404).send(`Reservation(${id}) not found`)
    }
    reservations.splice(index, 1)
    res.status(200).json(`Reservation(${id}) Cancelled`)
  } catch (e) {
    errorHandler(e)
    // res.status(404).json(e.message ? e.message : 'Oops, something went wrong')
    res.status(204).json(e)
  }
}

module.exports = { postReservation, getReservation, deleteReservation }
