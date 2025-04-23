import React, { useContext, useEffect, useState } from 'react'
import "./style1.css"
import "./shimmereffect.css"
import { Link, useLocation, useParams } from 'react-router'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/themecontex'

const makeRequest = async function (data) {
    if (!data.borders) {
        data.borders = []
    }
    return Promise.all(
        data.borders.map((border) => {
            return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(" 404 Page Not Found ")
                    }
                    return res.json();
                })
                .then(([res]) => {
                    return res.name.common;
                })
        })
    )

}

export default function CountriesDetail() {
    const [countryData, setCountryData] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [borderCountries, setBorderCountries] = useState([]);
    const params = useParams();
    const countryName = params.country;
    const { state } = useLocation();
    const [isDark] = useContext(ThemeContext)
    
    if (state) {
        useEffect(() => {
            makeRequest(state)
                .then((borders) => {
                    setCountryData(state)
                    setBorderCountries(borders)
                })
                .catch(err => {
                    setPageNotFound(true)
                    console.log(err)
                })
        }, [])
    }
    else {
        useEffect(() => {
            fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(" 404 Page Not Found ")
                    }
                    return res.json();
                })
                .then(([data]) => {
                    setCountryData(data)
                    makeRequest(data)
                        .then((borders) => {
                            setBorderCountries(borders)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    setPageNotFound(true)
                })
        }, [countryName])
    }

    if (pageNotFound) {
        return <div className={isDark?"page-not-found dark":"page-not-found"}>Something went wrong</div>
    }


    return countryData == null ?
        <div className={isDark?"container dark":"container"}>
            <div className='div1'></div>
        </div>
        : <main className={isDark ? "dark" : ""}>
            <span className="back-btn" onClick={() => { history.back() }}><i className="fa-solid fa-arrow-left-long"></i>Back</span>
            <div className="country-details-container">
                <img className="img" alt="" src={countryData.flags.svg} />
                <div className="country-details">
                    <h2 className="heading">{countryData.name.common}</h2>
                    <div className="text-content">
                        <div className="text-first">
                            <p><b>Native Name: </b><span className="native-name" >{countryData.name.nativeName ? Object.values(countryData.name.nativeName).common : countryData.name.common}</span></p>
                            <p><b>Population: </b><span className="population" >{countryData.population.toLocaleString('hi-IN')}</span></p>
                            <p><b>Region: </b><span className="region"></span>{countryData.region}</p>
                            <p><b>Sub Region: </b><span className="sub-region">{countryData.subregion}</span></p>
                            <p><b>Capital: </b><span className="capital">{countryData.capital}</span></p>
                        </div>
                        <div className="text-second">
                            <p ><b>Top Level Domain: </b><span className="top-level-domain">{countryData.tld}</span></p>
                            <p ><b>Currencies: </b><span className="currencies">{Object.values(countryData.currencies).map((currencies) => currencies.name).join(", ")}</span></p>
                            <p ><b>Languages: </b><span className="languages">{Object.values(countryData.languages).join(", ")}</span></p>
                        </div>
                    </div>
                    <p className="border-country-text"><b>Border Countries: </b>
                        {
                            borderCountries.map((border) => {
                                return <Link key={border} to={`/${border}`} >{border}</Link>
                            })
                        }
                    </p>
                </div>
            </div>
        </main>
}
