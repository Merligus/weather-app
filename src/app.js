const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get
(
    "", 
    (req, res) =>
    {
        const data = 
        {
            title: "Weather App",
            name: "Merligus"
        }
        res.render("index", data)
    }
)

app.get
(
    "/about", 
    (req, res) =>
    {
        const data = 
        {
            title: "About me",
            name: "Merligus"
        }
        res.render("about", data)
    }
)

app.get
(
    "/help", 
    (req, res) =>
    {
        const data = 
        {
            title: "Help",
            message: "If you need any help try contacting me at gustavomerli18@gmail.com.",
            name: "Merligus"
        }
        res.render("help", data)
    }
)

app.get
(
    "/weather", 
    (req, res) =>
    {
        if (!req.query.address)
            return res.send({error: "You must provide an address!"})

        geocode
        (
            req.query.address,
            (error, {latitude, longitude, location} = {}) => 
            {
                if (error)
                    return res.send({error})

                forecast
                (
                    latitude, 
                    longitude,
                    (error, forecastData) => 
                    {
                        if (error)
                            return res.send({error})

                        const forecast = "The temperature in " + 
                                        location + 
                                        " is " + 
                                        forecastData.temperature +
                                        " °C but it feels like " +
                                        forecastData.feelslike +
                                        " °C. The humidity is " + 
                                        forecastData.humidity +
                                        " \%. " +
                                        forecastData.description
                        const data = 
                        {
                            location,
                            forecast,
                            address: req.query.address
                        }
                        res.send(data)
                    }
                )
            }
        )
    }
)

app.get
(
    "/help/*", 
    (req, res) =>
    {
        const data = 
        {
            title: "Error",
            message: "Help page not found.",
            name: "Merligus"
        }
        res.render("404", data)
    }
)

app.get
(
    "*", 
    (req, res) =>
    {
        const data = 
        {
            title: "Error",
            message: "Page not found.",
            name: "Merligus"
        }
        res.render("404", data)
    }
)

app.listen
(
    port,
    () =>
    {
        console.log("Server is up on port " + port)
    }
)