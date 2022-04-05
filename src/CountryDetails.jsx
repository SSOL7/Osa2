import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function CountryDetails({ countries }) {
  const params = useParams();
  const navigate = useNavigate();

  let name;
  let flaImg;
  let nativeName;
  let population;
  let region;
  let subRegion;
  let capital;
  let topLevelDomain;
  let currencies = [];
  let languages = [];
  let borders = [];

  countries?.forEach((country) => {
    if (country.alpha3Code === params.code) {
      name = country.name;
      flaImg = country.flag;
      nativeName = country.nativeName;
      population = country.population;
      region = country.region;
      subRegion = country.subregion;
      capital = country.capital;
      topLevelDomain = country.topLevelDomain;
      currencies = country.currencies;
      languages = country.languages;
      borders = country.borders;
    }
  })



  const goBack = () => {
    navigate('/');
  }

  return (
    <div>
        <button onClick={goBack}>Go back</button>
        <img src={flaImg} alt="" />
        <h1>{name}</h1>
        <p>{nativeName}</p>
        <p>{population}</p>
        <p>{region}</p>
        <p>{subRegion}</p>
        <p>{capital}</p>
        <p>{topLevelDomain}</p>
        <p>{currencies}</p>
        <p>{languages}</p>
        <p>{borders}</p>
        
    </div>
  )
}

export default CountryDetails