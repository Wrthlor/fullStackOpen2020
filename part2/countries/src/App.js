import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import List from './components/List';

const App = () => {
    const [countries, setCountry] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [weatherData, setWeather] = useState();

    // Use effect hook to gather information from database
    // Country data
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                setCountry(response.data);
            })
            .catch((error) => {
                console.error("Errors: ", error);
            })
    }, []);

    // Weather data
    useEffect(() => {
        const capitals = filteredCountries.map(country => country.capital);
        if (capitals.length === 1) {
            const API_KEY = process.env.REACT_APP_API_KEY;
            const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitals[0]}&units=metric&appid=${API_KEY}`;
            if (capitals[0]) {
                axios
                    .get(baseUrl)
                    .then((response) => {
                        setWeather(response.data);
                    })
                    .catch((error) => {
                        console.error("Errors: ", error)
                    })   
            } 
        } 
    });

    // Creates a "filtered" array from list of countries from database (case-insensitive)
    const filteredCountries = countries.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Event handler function to deal with user entries
    const searchBarEntry = (event) => setSearchTerm(event.target.value);

    // Function for upon clicking button, changes searchTerm to the name of said country
    const handleClick = (countryName) => setSearchTerm(countryName);

    return (
        <div>
            <Filter 
                value={searchTerm} 
                onChange={searchBarEntry} 
            />
            <br />
            <List 
                countries={filteredCountries} 
                handleClick={handleClick}
                weatherData={weatherData}
            />
        </div>
    );
};

export default App;