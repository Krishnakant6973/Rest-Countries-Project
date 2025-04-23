import React from 'react'
import { Link } from 'react-router'
export default function Card({ countryData }) {
    return (
        <Link className="country-card" to={`/${countryData.name.common}`} state={countryData}>
            <div className='img-container'><img src={countryData.flags.svg} alt={countryData.name.common} /></div>
            <div className="text-content-card">
                <h2>{countryData.name.common}</h2>
                <p><b>Population: </b>{countryData.population.toLocaleString('hi-IN')}</p>
                <p><b>Region: </b>{countryData.region}</p>
                {countryData.capital ? <p><b>Capital: </b>{countryData.capital}</p> : undefined}
            </div>
        </Link >
    )
}
