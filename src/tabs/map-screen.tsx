import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const OPENWEATHER_API_KEY = '98dc9516d2cb8fe245b1b135cfa17cfe';

export default function MapScreen() {
  const [marker, setMarker] = useState(null);
  const [weather, setWeather] = useState(null);
  const [showWeather, setShowWeather] = useState(false);

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data');
    }
  };

  const handleLongPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    fetchWeather(latitude, longitude);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.4501,
          longitude: 30.5234,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
        onLongPress={handleLongPress}
      >
        {marker && <Marker coordinate={marker} onPress={() => setShowWeather(true)} />}
      </MapView>

      {showWeather && (
        <View style={styles.weatherBox}>
          <Text style={styles.weatherText}>{weather.name}</Text>
          <Text style={styles.weatherText}>{weather.main.temp}°C</Text>
          <Text style={styles.weatherText}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  weatherBox: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: '#1F1F1Fbf',
    padding: 10,
    borderRadius: 24,
    alignItems: 'center',
  },
  weatherText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
});