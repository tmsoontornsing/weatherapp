import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import { useCity } from "../context/CityContext";
import { getCoordinates, getWeatherData } from "../utils/api"; // Custom API functions

export default function HomeScreen() {
  const { city } = useCity();
  const [region, setRegion] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [heatmapPoints, setHeatmapPoints] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!city) return;

      const coordinates = await getCoordinates(city);
      setRegion({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });

      const weather = await getWeatherData(city);
      setWeatherData(weather);

      // Simulate heatmap points (you can replace this with actual weather-related heatmap data)
      setHeatmapPoints([
        { latitude: coordinates.lat + 0.01, longitude: coordinates.lng + 0.01, weight: 1 },
        { latitude: coordinates.lat - 0.01, longitude: coordinates.lng - 0.01, weight: 2 },
        { latitude: coordinates.lat + 0.02, longitude: coordinates.lng + 0.02, weight: 3 },
      ]);
    }

    fetchData();
  }, [city]);

  if (!region || !weatherData) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        <Heatmap
          points={heatmapPoints}
          opacity={0.6}
          radius={20}
          maxIntensity={100}
          gradient={{
            colors: ["blue", "green", "yellow", "red"],
            startPoints: [0.1, 0.3, 0.5, 0.9],
            colorMapSize: 256,
          }}
        />
      </MapView>

      <View style={styles.weatherBlock}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.temp}>{weatherData.temp}°C</Text>
        <Text>{weatherData.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  weatherBlock: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  city: { fontSize: 18, fontWeight: "bold" },
  temp: { fontSize: 22, fontWeight: "bold", color: "blue" },
});
