import React from 'react';
import Country from './Country';

const List = ({ countries }) => {

    // Declare variable which meet conditions (amount of countries from filter/search)
    const tooManyCountries = countries.length > 10;
    const multipleCountries = countries.length > 1 && countries.length <= 10;
    const singleCountry = countries.length === 1;

    // Creates new array of countries
    const countryList = countries.map( (item) => {
        return <div key={item.alpha3Code}>{item.name}</div>
    });

    // Displays relevant "data" depending on matching conditions (using logical AND)
    return (
        <div>
            {tooManyCountries && "Too many matches, please be more specific"}
            {multipleCountries && countryList}
            {singleCountry && <Country country={countries[0]} />}
        </div>
    );
};

export default List;