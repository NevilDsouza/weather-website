const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Nevil D'Souza"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nevil D\'Souza'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nevil D\'Souza',
        message: 'This is an help text, that is not very helpful!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, {location, lat, long} = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }
        
        forecast(lat, long,(error, {weatherDesc, temperature, feelslike, humidity}) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            
            // console.log(location)
            // console.log(`${weatherDesc}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees`)
            
            res.send({
                forecast: `${weatherDesc}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees. Humidity is ${humidity}%.`,
                location
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: [] 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error 404",
        name: "Nevil D'Souza",
        errMsg: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error 404",
        name: "Nevil D'Souza",
        errMsg: "My 404 Error Page."
    })
})

app.listen(port, () => {
    console.log(`Server is Up on port ${port}.`)
})