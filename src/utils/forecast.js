const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a76a82395fe7eb088f022ba25a18c9aa/'+ latitude +',' + longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback(chalk.red('Unable to connect to weather service!'), undefined)
        } else if (body.error) {
            callback(chalk.red('Unable to find location!'), undefined)
        } else {
            const currChanceOfRain = body.currently.precipProbability
            const currTemp = body.currently.temperature
 
            callback(undefined, 
                 body.daily.data[0].summary + ' It is currently ' + currTemp+ ' degrees out. With a ' + currChanceOfRain + '% chance of rain.'
            )
        }
    })
}
module.exports = forecast