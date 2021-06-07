const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmV2aWxkc291emExMjM5IiwiYSI6ImNrcGIwYzFkdDB2Nncyb3Q3a2oxcGlkb2EifQ.0VcBWXXYvRalUFc3UR_cnQ&limit=1`

    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Use other Keyword.', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1], 
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode