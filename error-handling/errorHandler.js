let logs = []
const errorHandler = (error) => {
  logs.push(error)

  console.log('errors:' + logs.length)
}

module.exports = { errorHandler }
