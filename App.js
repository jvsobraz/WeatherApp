//PEGUEI DE EXEMPLO O PROJETO: "pokemon-fiap"

import { Text, View, StyleSheet, TextInput, ImageBackground, Alert } from 'react-native';
import { React, useEffect, useState } from 'react';
import { api } from './api';

//api key: e5d55877d7ef290e791dd048dfd1bbaa

export default function App() {

  const [city, setCity] = useState([])
  const [weather, setWeather] = useState('')
  const [temperature, setTemperature] = useState(null)

  useEffect(() => {
    api.get()
      .then(response => {
        const weather = response.data.weather[0].description
        const temperature = (parseInt(response.data.main.temperature) - 273.15).toFixed(1) + 'Celsius'
        setWeather(weather);
        setTemperature(temperature)

      })
      .catch(err => {
        console.log(err)
        Alert.alert('Error, not possible to find this city: ');
      })
  }, [city]);

  return (
  <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.weather}>{weather}</Text>
        <Text style={styles.temperature}>{temperature}</Text>
          <TextInput 
            style={styles.input}
            placeholder='SEARCH FOR ANY CITY'
            onChangeText={setCity}
            value={city}
            onBlur={() => {
              setTemperature('')
              setWeather('')
            }}
          />

      </View>
    </ImageBackground>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },

  city: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#ddd'
  },

  weather: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: '#ddd',
    
  },

  temperature: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: '#ddd',
  },

  input: {
    height: 30,
    width: '60%',
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: '#ddd'
  },
});
