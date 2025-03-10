import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker , MapEvent} from 'react-native-maps';
import axios from 'axios';
import { MapNavigation, MarkerType, WeatherType } from '../types/types';

const OPENWEATHER_API_KEY = '98dc9516d2cb8fe245b1b135cfa17cfe';

export default function MapScreen({ navigation }: { navigation: MapNavigation }) {
  const [marker, setMarker] = useState<MarkerType | null>(null);
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [showWeather, setShowWeather] = useState<boolean>(false);

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );

      const { main, weather, name, sys } = response.data;

      const weatherData: WeatherType = {
        temp: main.temp,
        description: weather[0].description,
        name: name,
        country: sys.country,
      };

      setWeather(weatherData);
      setCity(weatherData.name);
      setCountry(weatherData.country);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data');
    }
  };

  const handleLongPress = (event: MapEvent) => {
    setShowWeather(false)
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
      <Text style={styles.title}>
        Location
      </Text>
      {showWeather && (
        <TouchableOpacity
          style={styles.weatherBox}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Search', { routCity: city, routCountry: country })}
        >
          <Text style={styles.weatherText}>{weather?.name}, {weather?.country}</Text>
          <Text style={styles.weatherText}>{Math.round(weather?.temp ?? 0)}°C, {weather?.description}</Text>
        </TouchableOpacity>
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
    backgroundColor: '#097969BF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 16,
    fontWeight: 700,
    color: 'white',
    paddingVertical: 3,
  },
  title: {
    position: 'absolute',
    fontSize: 26,
    fontWeight: 900,
    top: 30,
    alignSelf: 'center',
    textTransform: 'uppercase',
    color: '#FF3131',
  }
});