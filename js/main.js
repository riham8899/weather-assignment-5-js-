//http://api.weatherapi.com/v1/forecast.json?key=25774141855f4ae4973223514252706&q=alexandria&days=3

// http://api.weatherapi.com/v1/search.json?key=25774141855f4ae4973223514252706&q=cairo

const baseURL = `https://api.weatherapi.com/v1`;
const endPoint = `/forecast.json`;
const ApiKey = `25774141855f4ae4973223514252706`;
const row = document.querySelector(".row")
const searchInput = document.querySelector("#search") 
let weatherData = {};

const getDatedetails = (x) => {
    // console.log(x)
    const date = new Date(x)
    const weekDay = date.toLocaleString("en-us", {
        weekday: "long"
    })
    const numDay = date.toLocaleDateString("en-us", {
        day: "2-digit"
    })
    const month = date.toLocaleDateString("en-us", {
        month: "long"

    })
    console.log(date);
    return { weekDay, numDay, month };
}


const displayWeatherdata = (array) => {
    console.log(array)
    let cartona = ``;
    for (let i = 0; i < array.length; i++) {
        const { weekDay, numDay, month } = getDatedetails(array[i].date);


        cartona += `<div class="col-lg-4">
                    <div class="forecast-head d-flex justify-content-between">
                    ${i === 0 ? `<div class="day">${weekDay}</div>
                        <div class="date">${numDay}${month}</div>`
                : `<div class="day text-center">${weekDay}</div>`}
                        
                    </div>
                    <div class="forecast-body">
                    ${i === 0 ? `<div class="location p-3">${weatherData.location.name}<p></p></div>` : ``
            }

                    ${i === 0 ? `<div class="degree">
                            <div class="num text-center">${weatherData.current.temp_c}<sup>o</sup>C</div>
                        </div>

                        <div class="forecast-icon">
                            <img src=https:${weatherData.current.condition.icon} alt="" width="90">
                        </div>
                        <div class="custom p-3">${weatherData.current.condition.text}</div>
                    `: ` <div class="py-4 forecast-content"> <div class="py-4 ">
                            <img src= https:${weatherData.forecast.forecastday[i].day.condition.icon} alt="" width="48">
                        </div>
                        <div class="dgree py-3 fs-3 fw-bolder">
                            ${weatherData.forecast.forecastday[i].day.maxtemp_c} <sup>o</sup>C
                            <p class="text-secondary pt-3 fs-5 fw-normal">${weatherData.forecast.forecastday[i].day.mintemp_c}</p> </div>
                            <div class="custom p-3">${weatherData.forecast.forecastday[i].day.condition.text}</div> </div>`}
                            ${i===0?`  <div class="p-3">
                            <span>
                                <img src="img/icon-umberella.png"> ${weatherData.forecast.forecastday[0].day.daily_will_it_rain}
                            </span>
                            <span>
                                <img src="img/icon-wind.png"> ${weatherData.current.wind_kph}
                            </span>
                            <span><img src="img/icon-compass.png"> ${weatherData.current.wind_dir}</span>
                        </div>`:``}
                    </div>
                </div>`;
    }


    row.innerHTML = cartona;

}

const getWeatherData = async (city = 'Alexandria') => {
     if (city.length===0) getDatedetails(city ='Alexandria')
    if (city.length<3) return;

    try {
        let response = await fetch(`${baseURL}${endPoint}?key=${ApiKey}&q=${city}&days=3`)
        response = await response.json();
        // console.log(response);
        // console.log(response)
        weatherData = response;
        console.log(weatherData);
        displayWeatherdata(weatherData.forecast.forecastday)

    } catch (error) {
        console.log(error);


    }
}

// getWeatherData()



searchInput.addEventListener("input",(e)=>{
    getWeatherData(e.target.value)

})