const isGeolocationSupported = "geolocation" in window.navigator;

const getCurrentUsersLocationData = () => {
  if (!isGeolocationSupported) throw new Error("Geolocation API not supported");
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => reject(error)
    );
  });
};


const getWeatherDataByLocation = async (latitude, longitude) => {
   // const URL = `https://api.weatherapi.com/v1/current.json?key=65262a815b944d44ac8164121232610&q=${encodeURIComponent(location)}&aqi=no`;
    const URL = `https://api.weatherapi.com/v1/current.json?key=65262a815b944d44ac8164121232610&q=${latitude},${longitude}&aqi=no`;
    // const URL = `https://api.weatherapi.com/v1/current.json?key=2bd6638119db4178b2d141344232712&q=${encodeURIComponent(location)}&aqi=no`;
             //  https://api.weatherapi.com/v1/current.json?key=2bd6638119db4178b2d141344232712&q=18.454316,73.84977&aqi=no
  const rawResponse = await fetch(URL);
  const finalResult = await rawResponse.json();

  return finalResult;
};



const displayWeatherInfo = (weatherData) => {
    const resultElement = document.getElementById("result");
  
    // Update HTML content with weather information
    resultElement.innerHTML = `
      <p>Location: ${weatherData.location.name}, ${weatherData.location.country}</p>
      <p>Local Time: ${weatherData.location.localtime}</p>
      <p>Temperature: ${weatherData.current.feelslike_c} °C</p>;`

      resultElement.style.textAlign = 'center'
      resultElement.style.marginTop = '50px'
      
  };
  
  const fetchWeather = async () => {
    try {
      const locationInput = document.getElementById("locationInput");
      const manualLocation = locationInput.value.trim();
  
      if (!manualLocation) {
        console.log("Please enter a location.");
        return;
      }
  
      const weatherData = await getWeatherDataByLocation(manualLocation);
      
      // Display weather information for manual location
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const init = async () => {
    try {
      const locationData = await getCurrentUsersLocationData();
      console.log("User's location data:", locationData);
      const weatherData = await getWeatherDataByLocation(
        locationData.latitude,
        locationData.longitude
      );
      console.log("Weather data for user's location:", weatherData);
      // Display weather information
      displayWeatherInfo(weatherData);
  
      // Return the weather data if needed
      return weatherData;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  // Call the init function to fetch and display weather data
  init();
  
  
  