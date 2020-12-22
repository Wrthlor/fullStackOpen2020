import React from 'react';
import Weather from './Weather';

const Country = ({ theCountry, theWeather }) => {
    
    const country = theCountry;
 
    // List of languages in given country
    const languages = country.languages.map((item) => {
        return <li key={item.iso639_2}>{item.name}</li>
    });

    return (
        <div>
            <h1>{country.name}</h1>
            <div>Capital: {country.capital} </div>
            <div>Population: {country.population} </div>
            
            <h2>Languages</h2>
            <ul>{languages}</ul>

            <img 
                src={country.flag} 
                alt={`Flag of ${country.name}`} 
                width="200px"
            />
            
            <Weather weatherInfo={theWeather}/>
 
        </div>
    );

}

export default Country;