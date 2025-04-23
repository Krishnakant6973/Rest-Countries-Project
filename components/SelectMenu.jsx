import React from 'react'

const SelectMenu = React.memo(({ onChangeHandler }) => {
    return (
        <select name="" id="" className="filter" onChange={onChangeHandler}>
            <option value="" >Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
    )
})
export default SelectMenu;
