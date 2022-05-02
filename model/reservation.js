const Joi = require('joi')

const clientID = Joi.string().alphanum().min(6).max(30)

const reservation = Joi.object({
  id: Joi.string().alphanum().min(1).max(30),
  first_name: Joi.string().alphanum().min(1).max(30).required(),
  last_name: Joi.string()
    //.pattern(new RegExp('^[a-zA-Z]{3,30}$'))
    .alphanum()
    .min(1)
    .max(30)
    .required(),
  check_in: Joi.date().greater('now').required(),
  check_out: Joi.date().greater(Joi.ref('check_in')).required(),
  number_people: Joi.number().integer().min(1).max(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
})
//.with('username', 'birth_year')
// .xor('password', 'access_token')
//  .with('password', 'repeat_password');

module.exports = { reservation, clientID }
