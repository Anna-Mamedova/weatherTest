import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Forecast } from '../types/types';

const OPENWEATHER_API_KEY = '98dc9516d2cb8fe245b1b135cfa17cfe';

export default function SearchScreen() {
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [forecast, setForecast] = useState<Forecast[]>([]);
  const route = useRoute();
  const { routCity } = route.params || '';
  const { routCountry } = route.params || '';

  useFocusEffect(
    React.useCallback(() => {
      if (routCity) {
        setCity(routCity);
        setCountry(routCountry);
        searchWeather(routCity);
        setCity(`${routCity}, ${routCountry}`)
      }
    }, [routCity])
  );

  const searchWeather = async (cityToSearch: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityToSearch}&units=metric&cnt=40&appid=${OPENWEATHER_API_KEY}`
      );
      const data = response.data;

      function day(date: Date){
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let day = date.getDay()

        return days[day];
      }

      const dailyForecast: Forecast[] = [];
      data.list.forEach(item => {
        const date = day(new Date(item.dt * 1000));
        if (!dailyForecast.find(day => day.date === date)) {
          dailyForecast.push({
            date,
            temp: item.main.temp,
          });
        }
      });
      setForecast(dailyForecast);
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder='Enter city'
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        <TouchableOpacity 
          onPress={() => {
            searchWeather(city);
            setCity(`${city}, ${country}`);
          }}
          style={{width: 20, height: 20}}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../assets/search.png')}
            resizeMode='contain'
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        {forecast.length > 0 && (
          forecast.map((item, index) => (
            <View key={index} style={styles.dayBox}>
              <Text style={styles.dayBox__text}>{item.date}</Text>
              <Text style={styles.dayBox__text}>{Math.round(item.temp)}°C</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C1E1C1BF',
    padding: 20,
    flex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingRight: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '90%',

  },
  dayBox: {
    backgroundColor: '#097969BF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  dayBox__text: {
    color: 'white'
  }
});