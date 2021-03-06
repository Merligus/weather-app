const request = require("request")

const geocode = (address, callback) =>
{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + process.env.MAPBOX_API_KEY +"&limit=1"
    request
    (
        {url, json: true}, 
        (error, {body}) =>
        {
            if (error)
                callback("Unable to connect to location services", undefined)
            else if (body.features.length === 0)
                callback("Unable to find location", undefined)
            else
            {
                const longitude = body.features[0].center[0]
                const latitude = body.features[0].center[1]
                const location = body.features[0].place_name
                callback(undefined, {latitude, longitude, location})
            }
        }
    )
}

const getAddressByGeocode = (latitude, longitude, callback) =>
{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + longitude + "," + latitude + ".json?access_token=" + process.env.MAPBOX_API_KEY + "&limit=1"
    request
    (
        {url, json: true}, 
        (error, {body}) =>
        {
            if (error)
                callback("Unable to connect to location services", undefined)
            else if (body.features.length === 0)
                callback("Unable to find location", undefined)
            else
                callback(undefined, body.features[0].place_name)
        }
    )
}

module.exports = 
{
    geocode,
    getAddressByGeocode
}