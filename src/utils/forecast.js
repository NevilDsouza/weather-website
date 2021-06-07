const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b7d366b4d5cc5b6faa155d32066724b3&query=${lat},${long}`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const currentData = body.current
            callback(undefined, {
                weatherDesc: currentData.weather_descriptions[0],
                temperature: currentData.temperature,
                feelslike: currentData.feelslike
            })
        }
    })
}

module.exports = forecast