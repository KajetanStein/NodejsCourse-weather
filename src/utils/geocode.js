const request = require ('request');

const geocode = (address, callback) => {
  if (!address){
    console.log('Please provide an address')
  }
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2F5YXNzdCIsImEiOiJja2lzeHQ2YW0ya2FzMnFxajIzOG5ybnZmIn0.k-gctTas41yE2LDWCummvg&limit=1`
  request( { url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to location services')
    } else if (response.body.features.length<1) {
      callback('Unable to find location. Try another search')
    } else {
      callback(undefined, {
        latidute: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
  })
};

module.exports= geocode