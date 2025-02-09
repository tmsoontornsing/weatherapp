export async function getCoordinates(city: string) {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=0c0fbf40b9fd46fbae765d60d70e767e`
    );
    const data = await response.json();
    return data.results[0].geometry;
  }
  
  export async function getWeatherData(city: string) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e79affb0f9dc9e18050efd564c61a19&units=metric`
    );
    const data = await response.json();
    return {
      temp: data.main.temp,
      description: data.weather[0].description,
    };
  }
  