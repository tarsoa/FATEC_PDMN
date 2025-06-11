require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
const openWeatherClient = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/',
})

app.get('/weather', async (req, res) => {
  const city = req.query.city
  
  const response = await openWeatherClient.get('forecast', {
    params: {
        q: city,
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'pt_br'
    }
  })

  const forecasts = response.data.list.map(item => ({
        datetime: item.dt_txt,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        humidity: item.main.humidity,
        icon: item.weather[0].icon,
        description: item.weather[0].description        
  }))

  
  res.json(forecasts)
})

const port = 3000
app.listen(port, () => console.log (`Back End OK! Porta ${port}.`))