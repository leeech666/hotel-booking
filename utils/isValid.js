const Joi = require('joi')
const { reservation } = require('../model/reservation')
const { errorHandler } = require('../error-handling/errorHandler')
const { errorMessage } = require('../config')
const isValid = async (q, reservations) => {
  try {
    //validate user input
    let aa = await reservation.validate(q)
    if (aa.error) {
      return { error: aa.error.message }
    }

    //validate if the date is already taken
    for (let item of reservations) {
      if (
        new Date(item.check_in).getTime() <= new Date(q.check_in).getTime() &&
        new Date(q.check_in).getTime() <= new Date(item.check_out).getTime()
      ) {
        return {
          error: 'one or more days already taken!',
          code: 409,
        }
      }
      if (
        new Date(item.check_in).getTime() <= new Date(q.check_out).getTime() &&
        new Date(q.check_out).getTime() <= new Date(item.check_out).getTime()
      ) {
        return {
          error: 'one or more days already taken!',
          code: 409,
        }
      }
    }

    //validate how many days
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
