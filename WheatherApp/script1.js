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


const getWeatherData = async (lat, long) => {
    const URL = `https://api.weatherapi.com/v1/current.json?key=65262a815b944d44ac8164121232610&q=${lat},${long}&aqi=no`;
  
    const rawResponse = await fetch(URL);
    const finalResult = await rawResponse.json();
  
    return finalResult;
  };
  
//   const getWeatherForLocation = async () => {
//     const locationInput = document.getElementById('locationInput').ariaValueMax;

//     if (!locationInput) {
//         alert('please enter a location');
//         return;
//     }

  const init = async () =>{
    try {
        const locationData = await getCurrentUsersLocationData();
        const weatherData = await getWeatherData(
            locationData.latitude,
            locationData.longitude
          );
          displayWeatherInfo(weatherData);

          // Return the weather data if needed
          return weatherData;
        } catch (error) {
            console.error("Error:", error);

     const manualLocation = prompt("Please enter a location:");
     if (manualLocation) {
        try {
          const weatherData = await getWeatherDataByLocation(manualLocation);
          displayWeatherInfo(weatherData);
          return weatherData;
        } catch (manualError) {
          console.error("Error fetching weather data for manual location:", manualError);
          // Display an error message to the user if needed
        }
      } else {
        console.log("User canceled manual location input.");
        // Handle the case where the user canceled manual input
      }
    }
  };
  
  // Call the init function to fetch and display weather data
  init();

//           const resultElement = document.getElementById("result");
          
//           resultElement.innerHTML = `
//           <p> Hey user, your data is </P>
//           <p>Location: ${weatherData.location.name}, ${weatherData.location.country}</p>
//           <p>Local Time: ${weatherData.location.localtime}</p>
//           <p>Temperature: ${weatherData.current.feelslike_c} °C</p>
//         `
//         resultElement.style.textAlign = 'center'
//         resultElement.style.marginTop = '50px'

//         return weatherData;
//     } catch (error) {
//         console.error("Something went wrong", error);
//     }
//   }
//   init();