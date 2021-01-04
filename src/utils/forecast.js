const request= require('request')

const forecast = (lang, long, callback) =>{
  const url =`http://api.weatherstack.com/current?access_key=7b20e3eaf027b2d5acebd2586206534c&query=${lang, long}`

  request( { url: url, json: true}, (error, response) => {

    if (error) {
      callback('Unable to connect to location services')
    } else if (response.body.error) {
      callback('Unable to find location. Try another search')
    } else {
      const {current} = response.body;
      callback(undefined, `${current.weather_descriptions[0]}. It's currently ${current.temperature} degrees. It feels like ${current.feelslike}`)
    }
  })
}

module.exports = forecast