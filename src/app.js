const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
// REM: 1st argument must be 'view engine' otherwise express won't recognise the engine
// REM: hbs is a 'special' handlebars plugin for express. Note express expects all it's handlebars to be in a 'views' folder in the project's root dir
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve (i.e use express to push content of folder to webserver)
app.use(express.static(publicDirPath))

// Define different site routes with 'app.get()'
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Leo Njampa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'Leo Njampa'
    })
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This helpful message was rendered from an hbs template file. WooHoo!!',
        title: 'Help',
        name: 'Leo Njampa'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ 
            error: 'You must provide an address!' 
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error){
            return res.send({
                error: 'Unable to find location. Try another search!'
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found!',
        name: 'Leo Njampa'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Leo Njampa'
    })
})

// dev port for app to listen on
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})