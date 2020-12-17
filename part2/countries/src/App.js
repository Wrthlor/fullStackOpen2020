import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import List from './components/List';

const App = () => {
    const [countries, setCountry] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Event handler function to deal with user entries
    const searchBarEntry = (event) => setSearchTerm(event.target.value);

    // Use effect hook to gather information from URL
    useEffect(() => {
        //console.log('effect');
        const eventHandler = response => {
            //console.log('promise fulfilled');
            setCountry(response.data);
        };
        const promise = axios.get('https://restcountries.eu/rest/v2/all');
        promise.then(eventHandler);
    }, [] );

    // Creates a "filtered" array from list of countries from database (case-insensitive)
    const filteredCountries = countries.filter( (item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <Filter 
                value={searchTerm} 
                onChange={searchBarEntry} 
            />

            <br />

            <List countries={filteredCountries} />
        </div>
    );

};

export default App;