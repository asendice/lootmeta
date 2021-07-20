import React, { useState } from "react";

const SearchBar = (props) => {
    const [value, setValue] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        props.setTerm(value)
        props.onSubmit();
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="searchBarContainer" >
                <input className="searchBar" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                <button  type="submit">submit</button>
                </div>
                
            </form>
        </div>
    )
}

export default SearchBar;