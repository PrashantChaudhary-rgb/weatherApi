const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();

const apiKey = process.env.API_KEY;
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    if (!cities || !Array.isArray(cities)) {
      return res.status(400).json({ error: 'Invalid input. Please provide an array of cities.' });
    }

    const weatherResults = await getWeatherData(cities);
    res.json({ weather: weatherResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getWeatherData(cities) {
  const weatherResults = {};

  const apiUrl = 'http://api.weatherapi.com/v1';

  for (const city of cities) {
    try {
      const response = await axios.get(`${apiUrl}/current.json?key=${apiKey}&q=${city}`);
      const temperature = response.data.current.temp_c; 
      //console.log(temperature);
      weatherResults[city] = `${temperature}C`;
    } catch (error) {
      console.error(`Failed to fetch weather for ${city}: ${error.message}`);
      weatherResults[city] = 'N/A';
    }
  }

  return weatherResults;
}

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
