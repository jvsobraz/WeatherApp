import { Text, View, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from './api';

const apiKey = 'e5d55877d7ef290e791dd048dfd1bbaa';

export default function App() {

  const [city, setCity] = useState('São Paulo')
  const [weather, setWeather] = useState('')
  const [temperature, setTemperature] = useState(0)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},BR&appid=${apiKey}`)
      .then(res => {
        const weather = res.data.weather[0].description
        const temperature = (parseInt(res.data.main.temperature) - 273.15).toFixed(1) + '°C'
        setWeather(weather);
        setTemperature(temperature)

      }).catch(error => {
        console.log(error)
        return 'Error'
      })
  }, [city]);


  return (
  <ImageBackground source={require('./assets/image/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.info}>{weather}</Text>
        <Text style={styles.info}>{temperature}</Text>
          <TextInput 
            style={styles.input}
            placeholder='Search any city'
            value={city}
            onChangeText={setCity}
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
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  cidade: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff'
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
    color: '#fff',
    
  },
  input: {
    height: 32,
    width: '60%',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: '#fff'
  },
});