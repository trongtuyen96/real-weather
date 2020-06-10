var x = document.querySelector(".city-name");
var date = new Date();
var hour = date.getHours();


// Event handling for buttons "Check" 
document.getElementById("btn-check-location").addEventListener("click", function () {
    getLocation();
});

document.getElementById("btn-submit").addEventListener("click", function () {
    getWeather($("#city-input").val());
});

// Event handling for press Enter 
document.getElementById("city-input").addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        getWeather($("#city-input").val());
        $("#city-input").val("");
    }
}, false);


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    displayLocation(lat, lon);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function displayLocation(latitude, longitude) {
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({
            'latLng': latlng
        },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add = results[0].formatted_address;
                    var value = add.split(",");

                    count = value.length;
                    country = value[count - 1];
                    city = value[count - 2];
                    adress = value[count - 3];
                    correct = true;
                    x.innerHTML = city;
                    getWeather(city);
                } else {
                    x.innerHTML = "Address not found";
                }
            } else {
                x.innerHTML = "Geocoder failed due to: " + status;
            }
        }
    );
}

function getWeather(city) {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=3a04b53f7b6d2edbaad0c1e9b9d783f1",
        function (response) {
            console.log(response);
            var city2 = city;
            var country = response.sys.country;
            var weather = response.weather[0].main;
            var temp = response.main.temp;
            var pressure = response.main.pressure;
            var windSpeed = response.wind.speed;
            console.log(city2 + " " + country + " " + weather + " " + temp + " " + pressure + " " + windSpeed);
            weatherSet(city2, country, weather, temp, pressure, windSpeed);
        });
}

function weatherSet(city, country, weather, temp, pressure, windSpeed) {
    console.log(weather);
    if (weather == "Clear") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="video-frame"><source  src="videos/clearNight.mp4" type="video/mp4"></video>');
    }
    if (weather == "Clear" && (hour <= 20 && hour >= 6)) {
        $("#weather-video").html("<video autoplay muted loop " + 'id="video-frame"><source  src="videos/clearDay.mp4" type="video/mp4"></video>');
    }
    if (weather == "Rain") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="video-frame"><source  src="videos/rain.mp4" type="video/mp4"></video>');
    }
    if (weather == "Clouds") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="video-frame"><source  src="videos/cloudsNight.mp4" type="video/mp4"></video>');
    }
    if (weather == "Clouds" && (hour <= 20 && hour >= 6)) {
        $("#weather-video").html("<video autoplay muted loop " + 'id="video-frame"><source  src="videos/clouds.mp4" type="video/mp4"></video>');
    }
    if (weather == "Snow") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="video-frame"><source  src="videos/snow.mp4" type="video/mp4"></video>');
    }
    if (weather == "Mist") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="video-frame"><source  src="videos/mist.mp4" type="video/mp4"></video>');
    }
    if (weather == "Thunderstorm") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="video-frame"><source  src="videos/thunderstorm.mp4" type="video/mp4"></video>');
    }
    //    $(".container-fluid").css("background", "rgba(0, 0, 0, 0.4)");    
    $("#city-info").html(city + " " + country);
    $("#weather-info").html(weather);
    $("#temp-info").html(temp + " &deg;C");
    $("#pressure-info").html(pressure + " hPa");
    $("#wind-speed-info").html(windSpeed + " m/s");
    $("#total-info").show();
    thunderstorm
}
