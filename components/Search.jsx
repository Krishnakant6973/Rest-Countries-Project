import React from 'react'

const Search = React.memo(({ onInputHandler }) => {
    return (
        <div className="search-container" onInput={onInputHandler}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search for a country.." />
        </div>
    )
})
export default Search;
