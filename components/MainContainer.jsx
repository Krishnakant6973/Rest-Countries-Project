import React, { useEffect, useState, useCallback, useContext } from "react";
import SelectMenu from "./SelectMenu";
import Search from "./Search";
import Card from "./Card";
import "./style.css";
import "./shimmereffect.css"
import { ThemeContext } from "../contexts/themecontex";
import { useContext } from "react";
const makeRequest = async function (url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.log(err.message);
    }
};

const ShimmerCardRenderer = function () {
    let list = []
    for (let i = 0; i < 20; i++) {
        list.push(<div className='container' key={i} style={{ width: 250, height: 350 }}>
            <div className='div1'></div>
        </div>)
    }
    return list;
}

export default function MainContainer() {
    const [countriesData, setCountriesData] = useState([]); // Original fetched data
    const [filteredData, setFilteredData] = useState([]); // Filtered data for rendering
    const [query, setQuery] = useState("");
    const [pageNotFound, setPageNotFound] = useState(false)
    const [isDark] = useContext(ThemeContext)

    useEffect(() => {
        makeRequest("https://restcountries.com/v3.1/all")
            .then(res => {
                if (res) {
                    setCountriesData(res)
                }
                else {
                    setPageNotFound(true)
                    setCountriesData([])
                }
            })
    }, [])

    // Throttling or debouncing handler
    useEffect(() => {
        const id = setTimeout((countriesData, query) => {
            const data = countriesData.filter((country) => {
                return country.name.common
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            }
            );
            setFilteredData(data);
        }, 100, countriesData, query);
        return () => { clearTimeout(id) };
    }, [query, countriesData]);

    const onInputHandler = useCallback(
        (e) => {
            setQuery(e.target.value)
        }, []);

    const onChangeHandler = useCallback(
        (e) => {
            if (e.target.value === "") {
                makeRequest("https://restcountries.com/v3.1/all")
                    .then(res => {
                        if (res) {
                            setCountriesData(res)
                        }
                        else {
                            setPageNotFound(true)
                            setCountriesData([])
                        }
                    })
            }
            else {
                makeRequest(`https://restcountries.com/v3.1/region/${e.target.value}`)
                    .then(res => {
                        if (res) {
                            setCountriesData(res)
                        }
                        else {
                            setPageNotFound(true)
                            setCountriesData([])
                        }
                    })
            }
        }, []);


    if (pageNotFound) {
        return <div className={isDark ? "page-not-found dark" : "page-not-found"}>Something went wrong</div>
    }

    return (
        <main className={isDark ? "dark" : ""}>
            <div className="main-container">
                <div className="filter-container">
                    <Search onInputHandler={onInputHandler} />
                    <SelectMenu onChangeHandler={onChangeHandler} />
                </div>
                <div className="country-container">
                    {
                        countriesData.length == 0 ? <ShimmerCardRenderer /> : filteredData.length == 0 ? "No Search result Found" : filteredData.map((countryData) => (
                            <Card key={countryData.name.common} countryData={countryData} />
                        ))
                    }
                </div>
            </div>
        </main>
    );
}
