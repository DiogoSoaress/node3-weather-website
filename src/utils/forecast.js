const request = require('request')

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/53bcd9c9d53792f72430d35d3c884403/${lat},${lng}?units=si`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      const { temperature, precipProbability } = body.currently
      const dailySummary = body.daily.data[0].summary;
      callback(undefined, `${dailySummary} Is is currently ${temperature} degrees out. There is a ${precipProbability}% of rain.`)
    }
  })

}

module.exports = forecast