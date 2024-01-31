//    wheather app data ... using chaining

// const isGeolocationSupported = "geolocation" in window.navigator;

// function getCurrentUsersLocationData () {
//   if (!isGeolocationSupported) throw new Error("Geolocation API not supported");
//   return new Promise((resolve, reject) => {
//     window.navigator.geolocation.getCurrentPosition(
//        (position) =>
//         resolve({
//           lat: position.coords.latitude,
//           long: position.coords.longitude,
//         }),
//       (error) => reject(error)
//     );
//   });
// };
// function getWheatherData(lat,long){
//     const URL = `https://api.weatherapi.com/v1/current.json?key=2bd6638119db4178b2d141344232712&q=${lat},${long}&aqi=no`;
//     fetch (URL)
//     .then((res) => res.json())
//     .then((res) => {
//           const result = `hey user, you are in ${res.location.country}, ${res.location.name}, and time is  ${res.location.localtime} and the whether is ${res.current.feelslike_c} ` 
//           p.innerHTML = result
//         })

// }

// const p = document.getElementById('result')

// getCurrentUsersLocationData()
// //.then((res) => console.log('User Location',res))
// .then((res) =>getWheatherData(res.lat,res.long))

// .catch((res)=> console.log('Not Sharing his Location',res))



//       using aysnc await func
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
         
          const resultElement = document.getElementById("result");
          
          resultElement.innerHTML = `
          <p> Hey user, your data is </P>
          <p>Location: ${weatherData.location.name}, ${weatherData.location.country}</p>
          <p>Local Time: ${weatherData.location.localtime}</p>
          <p>Temperature: ${weatherData.current.feelslike_c} °C</p>
        `
        resultElement.style.textAlign = 'center'
        resultElement.style.marginTop = '50px'

        return weatherData;
    } catch (error) {
        console.error("Something went wrong", error);
    }
  }
  init();