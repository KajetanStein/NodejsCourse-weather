const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views/'))
hbs.registerPartials(path.join(__dirname, '../templates/partials/'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res) => {
  res.render('index', {title: 'weather App', name: 'Kajtek Stein'})
})

app.get('/help', (req,res) => {
  res.render('help', {title: 'Kurwa jaki dzban', name: 'Kajtek Stein'})
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({error: 'no address porvided'})
  }
  geocode(req.query.address, (error, { latitude, longitude, location}={})=>{
    if (error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData)=>{
    if (error) {
      return res.send({error})
    }
    res.send({
      location,
      forecast: forecastData
    })
  })
  })

})

app.get('/products'), (req,res) => {

  res.send({products: []})
}

app.get('/help/*', (req,res) => {
  res.render('404', {error: 'Help art not found'})
})

app.get('*', (req,res) => {
  res.render('404', {error: 'Page not found'})
})

app.listen(3001, () => {
  console.log('Server is up!')
})

