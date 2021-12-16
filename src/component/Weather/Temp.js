import React, { useEffect, useState } from 'react';
import './style.css';
import WeatherCard from './WeatherCard';

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Ahmedabad");
  const [tempInfo, setTempInfo] = useState("")

  const getWeatherInfo = async () => {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=d9209e487985b47dbc456ca79493c017  `
      // (api na data malse & fetch promise return kare che future ma get reuired fufill or rejected
      // tena mate await )
      const res = await fetch(url)
      // (get karel data ne convert karse json file ma tyare await pn use thase)
      const data = await res.json();

      const { temp, humidity, pressure } = data.main
      // console.log(temp);
      const { main: weathermood } = data.weather[0]
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys
      console.log(data);

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      }
      setTempInfo(myNewWeatherInfo);

    } catch (error) {
      console.log(error);
    }
  };
    // useeffect function one time j page load thay tyare j default city che aey show thay
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo} />
    </>
  )
}

export default Temp;
