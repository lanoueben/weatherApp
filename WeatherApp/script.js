let weather = {
    apiKey:"3ea056ae09b07524dba3e5954b38a24b",
    //@17:46 in video
    //@24:00 gotta find out how to link 2 functions properly


    fetchCoord: function(city){
        fetch(
            "http://api.openweathermap.org/geo/1.0/direct?q="
            + city
            + "&limit=5&appid="
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.fetchWeather(data[0].lat,data[0].lon,data[0].name));

    },

    fetchWeather: function(lat,lon,name) {
        console.log(lat, lon, name);

        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat="
            + lat
            + "&lon=" 
            + lon
            + "&units=imperial&appid=" 
            + this.apiKey
    
        ).then((response) => response.json())
        .then((data1) => this.displayWeather(data1,name));
    },

 
    displayWeather:function(data, name){

        const { icon} = data.weather[0];
        const { description } = data.weather[0];
        const { temp } = data.main;
        const { humidity } = data.main;
        const { speed } = data.wind;

        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')"

    },

    search: function(){
        this.fetchCoord(document.querySelector(".search-bar").value);
    }
};

document    
    .querySelector(".search button")
    .addEventListener("click", function(){
        weather.search();
});

document
    .querySelector(".search-bar").addEventListener("keyup", function(event){
    if( event.key == "Enter"){
        weather.search();
    }
    });


weather.fetchCoord("Denver");


