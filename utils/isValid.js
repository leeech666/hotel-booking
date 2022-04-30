const Joi = require('joi')
const { reservation } = require('../model/reservation')
const { errorHandler } = require('../error-handling/errorHandler')
const { errorMessage } = require('../config')
const isValid = async (q, reservations) => {
  try {
    let aa = await reservation.validate(q)
    if (aa.error) {
      //errorHandler(aa.error)
      return { error: aa.error.message }
    }

    for (let item of reservations) {
      if (
        new Date(item.check_in).getTime() <= new Date(q.check_in).getTime() &&
        new Date(q.check_in).getTime() <= new Date(item.check_out).getTime()
      ) {
        return {
          error: 'alreday booked!please change your stay period,thank you!',
        }
      }
      if (
        new Date(item.check_in).getTime() <= new Date(q.check_out).getTime() &&
        new Date(q.check_out).getTime() <= new Date(item.check_out).getTime()
      ) {
        return {
          error: 'alreday booked!please change your stay period,thank you!',
        }
      }
    }

    let days =
      (new Date(q.check_out).getTime() - new Date(q.check_in).getTime()) /
      1000 /
      60 /
      60 /
      24
    if (days < 4 && days > 0) {
      q['id'] = q.first_name + Date.now()
      return q
    } else {
      return { error: errorMessage.incorrectdays }
    }
  } catch (e) {
    errorHandler(e)
  }
}

module.exports = { isValid }
