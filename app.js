var input = document.querySelector("#city");
var temperatureDescription = document.querySelector(".temperature-description");
var temperatureDegree = document.querySelector(".temperature-degree");
var timezone = document.querySelector(".location-timezone");

window.addEventListener("load", () => {

    let lat;
    let lon;

    //HTML elements
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
           // console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;
           // let input = document.querySelector("#city");
            if (!(input && input.value)){
                //console.log("No input");
                callApi(lon, lat);
            }
            
        });
    }
    
    

    
});

var callApi = function(lon, lat) {
    
    

    const proxy = "https://cors-anywhere.herokuapp.com/";
        //const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0874c03b236daceb7fb0a7ddea17209e`;
        const api = `${proxy}http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0874c03b236daceb7fb0a7ddea17209e`;


        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
               // console.log("data");
                //console.log(data);
                const temperatureF = Math.round((data.current.temp - 273.15) * (9 / 5) + 32);
                const summary = data.current.weather[0].description;
               // console.log(summary);

                //Set DOM elements

                temperatureDegree.textContent = temperatureF;
                temperatureDescription.textContent = summary;
                 timezone.textContent = displayLocation(lat,lon);
                


                const icon = data.current.weather[0].icon;
                
                //console.log("loading animation");
                let animItem = bodymovin.loadAnimation({
                    wrapper: document.querySelector(".icon"),
                    animType: 'svg',
                    loop: true,
                    autoplay: true,
                    path: setIcons(icon)


                });
                //console.log(animItem);
                

            });


            function setIcons(icon) {
              //  console.log("setting icon");
                //console.log(icon);
                let weatherIcon = document.querySelector(".icon");
                //console.log(weatherIcon);
                if (icon == "01d") {
                    //clear day
                    weatherIcon.src = "https://assets1.lottiefiles.com/private_files/lf30_moaf5wp5.json";
                } else if (icon == "01n") {
                    //clear night
                    weatherIcon.src = "https://assets1.lottiefiles.com/private_files/lf30_iugenddu.json";
                } else if (icon == "02d") {
                    //few clouds day
                    weatherIcon.src = "https://assets1.lottiefiles.com/packages/lf20_kljxfos1.json";
                } else if (icon == "02n") {
                    //few clouds night
                    weatherIcon.src = "https://assets4.lottiefiles.com/private_files/lf30_nx7kptft.json";
                    //console.log(weatherIcon.src);
                } else if (icon == "03d" || icon == "03n") {
                    //scattered clouds
                    weatherIcon.src = "https://assets8.lottiefiles.com/packages/lf20_KUFdS6.json";
                } else if (icon == "04d") {
                    //broken clouds day
                    //console.log("In");
                    weatherIcon.src = "https://assets3.lottiefiles.com/private_files/lf30_ykkzuozu.json";
                } else if (icon == "04n") {
                    //broken clouds night
                    weatherIcon.src = "https://assets3.lottiefiles.com/private_files/lf30_nx7kptft.json";
                    //console.log(weatherIcon.src);
                } else if (icon == "09d" || icon == "09n") {
                    //shower rain 
                    weatherIcon.src = "https://assets9.lottiefiles.com/packages/lf20_bco9p3ju.json";
                } else if (icon == "10d") {
                    //rain day
                    weatherIcon.src = "https://assets8.lottiefiles.com/private_files/lf30_oj6pxozf.json";
                } else if (icon == "10n") {
                    //rain night
                    weatherIcon.src = "https://assets8.lottiefiles.com/private_files/lf30_3udf8lcw.json";
                } else if (icon == "11d" || icon == "11n") {
                    //thunderstorm
                    weatherIcon.src = "https://assets6.lottiefiles.com/temp/lf20_Kuot2e.json";
                } else if (icon == "13d" || icon == "13n") {
                    //snow
                    weatherIcon.src = "https://assets5.lottiefiles.com/temp/lf20_WtPCZs.json";
                } else if (icon == "50d" || icon == "50n") {
                    //mist
                    weatherIcon.src = "https://assets3.lottiefiles.com/temp/lf20_kOfPKE.json";
                }
                //console.log(weatherIcon.src);
                return weatherIcon.src;
            }
}




function initMap(){
        let lat;
        let lon;
        var place ="";
        var searchInput = document.querySelector("#city");
        var autoComplete = new google.maps.places.Autocomplete(searchInput,{
            types:["geocode"]
        });
        
        autoComplete.addListener("place_changed",()=>{
        place = autoComplete.getPlace();
        //console.log(place);
        lat = place.geometry.location.lat();
        //console.log(lat);
        lon = place.geometry.location.lng();
       // console.log(lon);
        });

        //timezone.textContent = place.vicinity;
        //console.log(timezone.textContent);
        document.getElementById("city").addEventListener("keyup", function(e) {
          //  console.log(e.keyCode);
            if (e.keyCode === 13) {
            document.querySelector(".search-button").click();
        }
    });

        document.querySelector(".search-button").addEventListener("click",()=>{
           // console.log("button clicked");
            if(input && input.value){
                let weatherIcon = document.querySelector(".icon");
                d3.selectAll('.icon svg').remove();
               // console.log(weatherIcon.src);
                callApi(lon,lat);
            }
        });
        
}

var displayLocation = function (latitude,longitude){
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  value=add.split(",");
                    console.log(value);

                    count=value.length;
                    country=value[count-1];
                    state=value[count-2];
                    city=value[count-3];
                    console.log(input.value);
                    if (!(input.value)){
                        console.log(city);
                        timezone.textContent= city;
                    } else{
                        console.log("input:");
                        console.log(input);
                        timezone.textContent = input.value;
                    }
                }
                else  {
                    timezone.textContent = "address not found";
                }
            }
            else {
                timezone.textContent = "Geocoder failed due to: " + status;
            }
        }
    );
}
