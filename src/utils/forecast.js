const request = require("request")

const forecast = (latitude, longitude, callback) =>
{
    const url = "http://api.weatherstack.com/current?access_key=" + process.env.WEATHERSTACK_API_KEY + "&query=" + latitude + "," + longitude
    request( {url, json: true}, 
        (error, {body}) =>
        {
            if (error)
                callback("Unable to connect to weather service", undefined)
            else if (body.error)
                callback("Unable to find location", undefined)
            else
            {
                const description = body.current.weather_descriptions[0]
                const temperature = body.current.temperature
                const feelslike = body.current.feelslike
                const humidity = body.current.humidity
                const data = { description, temperature, feelslike, humidity }
                callback(undefined, data)
            }
        }
    )
}

module.exports = forecast