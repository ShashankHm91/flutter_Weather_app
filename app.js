// Current Wether elements by HTML
let locationDetail = document.getElementById("location")
let tempicon = document.getElementById("temp-icon")
let tempvalue = document.getElementById("temp-value")
let climate = document.getElementById("climate")
let humid = document.getElementById("humidity")
let visibility_upto = document.getElementById("visibility")
let wind_speed = document.getElementById("wind-speed")


// Searched Weather elements by HTML
let search_locationDetail = document.getElementById("search_locationDetail")
let tempicon_img = document.getElementById("tempicons")
let tempvalue_result = document.getElementById("tempvalue_result")
let climate_value = document.getElementById("climate_value")
let humids = document.getElementById("humid")
let visibile = document.getElementById("visibility_upto")
let wind = document.getElementById("wind")
let add = document.getElementById("add")


// Favourite list elements by HTML
let locationDetail_fav = document.getElementById("location_fav")
let tempicon_fav = document.getElementById("temp-icon_fav")
let tempvalue_fav = document.getElementById("temp-value_fav")
let climate_fav = document.getElementById("climate_fav")
let humid_fav = document.getElementById("humidity_fav")
let visibility_upto_fav = document.getElementById("visibility_fav")
let wind_speed_fav = document.getElementById("wind-speed_fav")


// icon file
let iconfile;
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")


// Button to search
searchButton.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(searchInput.value);
    searchInput.value = "";
})

// calling api for city data when we search
const getWeather = async (city) => {
    try {
        // api to weather app using fetch fetching data
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd9ee0b486596836ec82ac9366a93c2e`,
            { mode: 'cors' })

        const weatherData = await resp.json()
        console.log(weatherData);

        // storing Details to html
        const { name } = weatherData
        const { feels_like, humidity } = weatherData.main
        const { id, main } = weatherData.weather[0]
        const { speed } = weatherData.wind
        const { visibility } = weatherData;

        // Updating fetched data to Html elements
        search_locationDetail.textContent = name
        climate_value.textContent = main
        tempvalue_result.textContent = Math.round(feels_like - 273);
        humids.textContent = `Humidity : ${humidity}%`;
        visibile.textContent = `Visibility : ${visibility / 1000}km`;
        wind.textContent = `Wind : ${speed}km/h`;

        // to didplay icon according to weeather
        if (id < 300 && id >= 200) {
            tempicon_img.src = "./icons/thunder-storm.svg"
        }
        else if (id < 400 && id >= 300) {
            tempicon_img.src = "./icons/cloud.svg"
        }
        else if (id < 600 && id >= 500) {
            tempicon_img.src = "./icons/rain.svg"
        }
        else if (id < 700 && id >= 600) {
            tempicon_img.src = "./icons/snow.svg"
        }
        else if (id < 800 && id > 700) {
            tempicon_img.src = "./icons/smoke.svg"
        }
        else if (id == 800) {
            tempicon_img.src = "./icons/clear-sky.svg"
        }
        else if (id > 800) {
            tempicon_img.src = "./icons/cloud.svg"
        }

        // On click add button add to favourite 
        add.addEventListener("click", (e) => {
            e.preventDefault();
            // let favItems = new Map()

            // setting data to favourite list
            locationDetail_fav.textContent = search_locationDetail.textContent;
            tempvalue_fav.textContent = tempvalue_result.textContent;
            climate_fav.textContent = climate_value.textContent;
            humid_fav.textContent = humids.textContent;
            visibility_upto_fav.textContent = visibile.textContent;
            wind_speed_fav.textContent = wind.textContent;
            tempicon_fav.src = tempicon_img.src;


            //  All details to array
            let favItem = [locationDetail_fav.textContent, tempicon_fav.src, tempvalue_fav.textContent, climate_fav.textContent, humid_fav.textContent, visibility_upto_fav.textContent, wind_speed_fav.textContent];

            // settin items to local starage
            const favItems = [...favItem]
            window.localStorage.setItem('user', JSON.stringify(favItems));
            console.log(favItem);

        })

    }

    // Cathcing error if any error 
    catch (error) {
        alert("City not found")
    }
}



// Getting live weather data  
window.addEventListener("load", () => {

    // onload getting data from local storage
    window.localStorage.getItem('user');
    let storage = JSON.parse(window.localStorage.getItem('user'));
    // console.log(typeof storage)
    console.log(storage)

    // display datas from local storage
    locationDetail_fav.textContent = storage[0];
    tempicon_fav.src = storage[1];
    tempvalue_fav.textContent = storage[2];
    climate_fav.textContent = storage[3];
    humid_fav.textContent = storage[4];
    visibility_upto_fav.textContent = storage[6];
    wind_speed_fav.textContent = storage[7];

    // Using logititude and latitude  
    let Longitude;
    let Latitude;

    // Using Geo location getting live weather data wirh location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            Longitude = position.coords.longitude
            Latitude = position.coords.latitude
            const proxy = "https://cors.zimjs.com/"

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=fd9ee0b486596836ec82ac9366a93c2e`

            // Using fetch updating data 
            fetch(api).then(res => res.json())
                .then(data => {
                    const { name } = data
                    const { feels_like, humidity } = data.main
                    const { id, main } = data.weather[0]
                    const { speed } = data.wind
                    const { visibility } = data;

                    // setting data to html elements
                    locationDetail.textContent = name
                    climate.textContent = main
                    tempvalue.textContent = Math.round(feels_like - 273);
                    humid.textContent = `Humidity : ${humidity}%`;
                    visibility_upto.textContent = `Visibility : ${visibility / 1000}km`;
                    wind_speed.textContent = `Wind : ${speed}km/h`;

                    // comparing icons with id to display icons according to weather
                    if (id < 300 && id >= 200) {
                        tempicon.src = "./icons/thunder-storm.svg"
                    }
                    else if (id < 400 && id >= 300) {
                        tempicon.src = "./icons/cloud.svg"
                    }
                    else if (id < 600 && id >= 500) {
                        tempicon.src = "./icons/rain.svg"
                    }
                    else if (id < 700 && id >= 600) {
                        tempicon.src = "./icons/snow.svg"
                    }
                    else if (id < 800 && id > 700) {
                        tempicon.src = "./icons/smoke.svg"
                    }
                    else if (id == 800) {
                        tempicon.src = "./icons/clear-sky.svg"
                    }
                    else if (id > 800) {
                        tempicon.src = "./icons/cloud.svg"
                    }
                })
        }

        )
    }
})
