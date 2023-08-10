
import img3 from "./assets/img.jpg"
import Description from "./Components/Description"
import { getFormateWeatherData } from "./WeatherService"

import React, { useEffect, useState } from 'react'

const App = () => {

  const [city, setcity] = useState("Delhi")
  const [weather, setweather] = useState(null)
  const [units, setunits] = useState("metric")


  useEffect(() => {
    const fetchWeatherdata = async () => {
      const data = await getFormateWeatherData(city, units)
      setweather(data)

    }
    fetchWeatherdata()
  }, [units, city])

  const handleUnitsClicks = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1)

    const iscelsius = currentUnit === "C"
    button.innerText = iscelsius ? "°F" : "°C"
    setunits(iscelsius ? "metric" : "imperial")
  }

  const interpassedkey = (e) => {

    if (e.keyCode === 13) {
      setcity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  return (
    <div className='app' style={{ backgroundImage: `url(${img3})` }}>
      <div className="overlay">
        {
          weather && (


            <div className="container">
              <div className="section section_input">
                <input onKeyDown={interpassedkey} type="text" name="City" placeholder="Enter the city ..." />
                <button onClick={(e) => handleUnitsClicks(e)}>°F</button>
              </div>
              <div className="section ssection_tempreture">
                <div className="icons">
                  <h3>{`${weather.name},${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="cloudy" />
                  <h3>{weather.description}</h3>
                </div>
                <div className="tempreture">
                  <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>
                </div>
              </div>
              {/* bottom description */}
              <Description weather={weather} units={units} />
            </div>

          )
        }

      </div>
    </div>
  )
}

export default App
