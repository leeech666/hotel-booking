const Joi = require('joi')
const { reservation } = require('../model/reservation')
const { errorHandler } = require('../error-handling/errorHandler')

const isValid = async (q) => {
  let aa = await reservation.validate(q)
  if (aa.error) {
    errorHandler(aa.error)
    return { error: aa.error.message }
  }

  try {
    let days =
      (new Date(q.check_out) - new Date(q.check_in)) / 1000 / 60 / 60 / 24
    if (days < 4 && days > 0) {
      q['id'] = q.first_name + Date.now()
      return q
    } else {
      return { error: 'check the days, please!' }
    }
  } catch (e) {
    errorHandler(e)
  }
}

module.exports = { isValid }
