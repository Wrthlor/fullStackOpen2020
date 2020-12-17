import React from 'react';

const Country = (props) => {
    
    const country = props.country;

    // List of languages in given country
    const languages = country.languages.map(  (item) => {
        return <li key={item.iso639_2}>{item.name}</li>
    });

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital} </p>
            <p>Population: {country.population} </p>
            
            <h2>Languages</h2>
            <ul>{languages}</ul>

            <img 
                src={country.flag} 
                alt={`Flag of ${country.name}`} 
                width="250px"
            />
        </div>
    );

}

export default Country;