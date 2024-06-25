const apiKey = "0ca3dbd04d9fbfb3f08bd883b3b72450";
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData)
        console.log(weatherData);
        console.log(weatherData);}
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    
    if(!response.ok){
        displayError("couldnt find the city");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city,
           main:{temp,humidity},
           weather: [{description,id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}℃`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = EmojiDisplayType(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("emojiDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);



}

function EmojiDisplayType(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId <300): return "⛈";
        case (weatherId >= 300 && weatherId <500): return "🌧";
        case (weatherId >= 500 && weatherId <600): return "🌧";
        case (weatherId >= 600 && weatherId <700): return "❄";
        case (weatherId >= 700 && weatherId <800): return "🌫";
        case (weatherId === 800): return "☀";
        case (weatherId >= 801 && weatherId <810): return "☁";
        default : return"❓";
        
    }

}

function displayError(message){
    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(error);
}
