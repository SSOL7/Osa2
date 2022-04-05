import React from 'react'

function Country({ name, capital, population, region, flag, showDetails, code }) {
    
    const showDetailsHandler = () => {
        showDetails(code);
    }

  return (
    <div onClick={showDetailsHandler}>
        <p>{name}</p>
        <p>{population}</p>
        <p>{region}</p>
        <p>{capital}</p>
        <p>{flag}</p>
    </div>
  )
}

export default Country