import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useCity } from "../context/CityContext";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "1e79affb0f9dc9e18050efd564c61a19"; // Replace with your API key

export default function HomeScreen() {
  const { city } = useCity();
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState({ lat: 40.7128, lon: -74.006 });

  useEffect(() => {
    async function fetchWeather() {
      try {
        const geoRes = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );

        if (geoRes.data.length > 0) {
          const { lat, lon } = geoRes.data[0];
          setCoords({ lat, lon });

          const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );

          setWeather(weatherRes.data);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }

    fetchWeather();
  }, [city]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: coords.lat,
          longitude: coords.lon,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={{ latitude: coords.lat, longitude: coords.lon }} title={city} />
      </MapView>

      {weather && (
        <View style={styles.weatherBox}>
          <Text style={styles.city}>{city}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  weatherBox: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  city: { fontSize: 20, fontWeight: "bold" },
  temp: { fontSize: 24, fontWeight: "bold" },
});
