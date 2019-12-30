const request = require('request')
const chalk = require('chalk')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibGVvbmphbXBhIiwiYSI6ImNrNG1vZXFjcTJieGEzZXF3cm9zbXVrNGwifQ.XEn3uZAM06Q7WOh1dDkRcQ&limit=1'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback(chalk.red('Unable to connect to location service!'), undefined)
        } else if (body.features.length === 0) {
            callback(chalk.red('Unable to find location. Try another search term!'), undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode