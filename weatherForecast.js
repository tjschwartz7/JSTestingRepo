
var longitude = 41.8240;
var latitude = -71.4128;

//The forecast for our initial data collection URL
var coordsUrl = `https://api.weather.gov/points/${longitude},${latitude}`;

fetch(coordsUrl)
    .then(response => response.json())
    //This code gets executed when we actually have the data from the API call
    .then(coordsData => {
        //Handle our coordinate/geographic data here
        const forecastUrl = coordsData.properties.forecast;

        //Get and print data from this JSON data
        var city = coordsData.properties.relativeLocation.properties.city;
        var state = coordsData.properties.relativeLocation.properties.state;
        console.log(`Weather conditions in ${city}, ${state}`);
        console.log(forecastUrl);

        //Make another fetch to get our forecast data
        fetch(forecastUrl)
            .then(response => response.json())
            //Relying on data from the previous API call, we now need to make a new
            //API call. That's why I dumped this API call in the .then of the previous one.
            //It is ugly code, but I figured it needs to be this way in order to avoid situations where we try
            //and utilize data we haven't received yet.
            .then(forecastData => {

                //This block of code has access to the forecast data we're looking for
                
                //Shortcut; we'll need this data a lot so I preloaded it
                //for shorter variable name access later
                var forecastJsonObject = forecastData.properties.periods;

                //Iterate over each day that has forecast day in the periods array
                for( var i = 0; i < forecastJsonObject.length; i++)
                { 
                    //Collect and print all of our forecast data
                    var currentForecast = forecastJsonObject[i].name;
                    var currentTemp = forecastJsonObject[i].temperature;
                    var currentTempUnit = forecastJsonObject[i].temperatureUnit;
                    var currentDetailedForecast = forecastJsonObject[i].detailedForecast;
                    console.log(`${currentForecast}`);
                    console.log(`Temperature: ${currentTemp} ${currentTempUnit}`);
                    console.log(currentDetailedForecast);
                    console.log("---------------------------------------------------------------");

                    console.log("\n");
                }
                
            })
            .catch(error => console.error('Error fetching forecast:', error));
    })
    .catch(error => console.error('Error fetching forecast:', error));

    

    console.log("This'll get printed before the API call data :)\n");
    console.log("I wanted to prove to myself that the JS code is executing linearly and the .then");
    console.log("function calls were basically a new thread being created which has code");
    console.log("which will only be executed upon the successful join of the API thread.\n");
    console.log("Looking at it like a watchdog thread, the thread sits in a busy-wait or blocking-wait");
    console.log("(ideally a blocking wait) until a tryjoin function call (the API call) successfully returns.");
    console.log("At this time, the remainder of the code in the .then block shall execute.\n\n");
