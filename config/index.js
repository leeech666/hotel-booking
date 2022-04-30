const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  endpoint: process.env.API_URL,
  port: process.env.PORT,
  errorMessage: {
    incorrectdays: 'only up to 3 days!',
  },
}
