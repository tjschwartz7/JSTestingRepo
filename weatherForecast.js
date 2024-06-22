
var longitude = 41.8240;
var latitude = -71.4128;

//The forecast for our initial data collection URL
var coordsUrl = `https://api.weather.gov/points/${longitude},${latitude}`;

fetch(coordsUrl)
    .then(response => response.json())
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

    

    
