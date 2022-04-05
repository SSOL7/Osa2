import React, { useState, useEffect, useRef } from "react";
import {Routes, Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";
import Country from "./Country";
import CountryDetails from "./CountryDetails";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const countriesInputRef = useRef();
  const regionRef = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  const [weatherData, setWeatherData] = useState({});

  const no_data = countries.status || countries.message;

  useEffect(() => {
    try {
      // search_countries();
      fetch_data();
    } catch (error) {
      console.log(error);
    }
    console.log(countries);
  }, []);

  const fetch_data = async () => {
    const response = await fetch('https://restcountries.com/v2/all');
    const data = await response.json();

    if(data.status === 404) {
      setCountries([]);
      return;
    }

    setCountries(data);
  }

  const url =`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=0G1vgC0oQj18gUyXgyjffHPGMVcf67cS&q=${location}&language=en-us&details=true`;

const search_location = (event) => {
  event.preventDefault();
  axios.get(url).then((response) => {
    console.log(response.data[0].Key);
    console.log(response.data);
    setData(response.data);
    console.log(data);
    return data[0];
  })
  setLocation('');
}
if(!data) {
  return null;
}
    
const weather_url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${weather}?apikey=0G1vgC0oQj18gUyXgyjffHPGMVcf67cS&metric=true`;
  const search_weather = async (event) => {
    event.preventDefault();
    axios.get(weather_url).then((response) => {
      console.log(response.data);
      setWeatherData(response.data);
      console.log(`${response.data.DailyForecasts[0].Date}`);
      console.log(`${response.data.DailyForecasts[0].Temperature.Maximum.Value}`);
      return data[0];
    })
    setWeather('');
  };

  if(!weatherData) {
    return null;
  }

  const showDetails = (code) => {
    navigate(`/${code}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <span>Seoul</span>
        <form onSubmit={search_weather}>
      <h1>Search for weather</h1>
      <input
      value={weather}
      onChange={event => setWeather(event.target.value)}
      type="text"
      name="title"
      id="title" />
      <br />
      <br />
      <input type="submit" value="Submit" className='submit-button' />
    </form>


      <form onSubmit={search_location}>
      <h1>Search for a city</h1>
      <input
      value={location}
      onChange={event => setLocation(event.target.value)}
      type="text"
      name="title"
      id="title" />
      <br />
      <br />
      <input type="submit" value="Submit" className='submit-button' />
    </form>

    <ul>
  {data.map(city => {
    return (
      <li key={city.Key}>
        <h3>City: {city.EnglishName}</h3>
        <p>Country: {city.Country.EnglishName}</p>
        <p>Administrative area: {city.AdministrativeArea.EnglishName}</p>
        <p>Timezone code: {city.TimeZone.Code}</p>
        <p>GMT Offset: {city.TimeZone.GmtOffset}</p>
        <p>Latitude: {city.GeoPosition.Latitude}</p>
        <p>Longitude: {city.GeoPosition.Longitude}</p>
      </li>
    )
  })}
</ul>

          <Routes>
            <Route path="/" element={
              <div>
                <input type="text" placeholder="Search for a country" ref={countriesInputRef} />
                <select ref={regionRef} >
                  <option value="">All</option>
                  <option value="">Asia</option>
                  <option value="">Oceania</option>
                  <option value="">America</option>
                  <option value="">Europe</option>
                  <option value="">Africa</option>
                </select>
                {!no_data ? (
                  countries?.map((country) => (
                    <Country 
                      key={country.alpha3Code}
                      code={country.alpha3Code}
                      name={country.name}
                      capital={country.capital}
                      population={country.population.toLocaleString()}
                      region={country.region}
                      flag={country.flag}
                      showDetails={showDetails}
                    />
                  ))
                ) : (
                  <p>No countries found</p>
                )}
              </div>
            }/>
            <Route path="/:countryCode" element={<CountryDetails countries={countries} />}/>
          </Routes>
      </header>
    </div>
  )
}

export default App
