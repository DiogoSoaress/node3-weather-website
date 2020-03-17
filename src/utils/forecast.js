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
      const dailySummary = body.daily.data[0].summary
      const { temperatureMax, temperatureMin} = body.daily.data[0] 
      callback(undefined, `${dailySummary} Today's maximum temperature will be ${temperatureMax}C and the minimum of ${temperatureMin}C It is currently ${temperature} degrees out. There is a ${precipProbability}% of rain.`)
    }
  })

}

module.exports = forecast