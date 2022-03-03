console.log("Script is loaded")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const getLocationButton = document.querySelector("#get-location")

weatherForm.addEventListener
(
    "submit", 
    (e) =>
    {
        e.preventDefault() // Prevent page reload
        const location = search.value

        messageOne.textContent = "Loading..."
        messageTwo.textContent = ""

        fetch("/weather/address?address=" + encodeURIComponent(location)).then
        (
            (response) =>
            {
                response.json().then
                (
                    (data) =>
                    {
                        if (data.error)
                        {
                            messageOne.textContent = data.error
                            messageTwo.textContent = ""
                        }
                        else
                        {
                            messageOne.textContent = data.location
                            messageTwo.textContent = data.forecast
                        }
                    }
                )
            }
        )
    }
)

getLocationButton.addEventListener
(
    "click",
    () =>
    {
        if (!navigator.geolocation)
            return alert("Geolocation not supported")

        getLocationButton.setAttribute("disabled", "disabled")

        messageOne.textContent = "Loading..."
        messageTwo.textContent = ""

        navigator.geolocation.getCurrentPosition
        (
            (position) =>
            {
                const location =
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }

                getLocationButton.removeAttribute("disabled")
                console.log(position)

                fetch(`/weather/geocode?latitude=${location.latitude}&longitude=${location.longitude}`).then
                (
                    (response) =>
                    {
                        response.json().then
                        (
                            (data) =>
                            {
                                if (data.error)
                                {
                                    messageOne.textContent = data.error
                                    messageTwo.textContent = ""
                                }
                                else
                                {
                                    messageOne.textContent = data.location
                                    messageTwo.textContent = data.forecast
                                }
                            }
                        )
                    }
                )
            }
        )
    }
)