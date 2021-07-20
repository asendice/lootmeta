import React, { useState } from "react";

const SearchBar = (props) => {
    const [value, setValue] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        props.setTerm(value);
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="searchBarContainer" >
                <input className="searchBar" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                <button  type="submit">Submit</button>
                </div>
                
            </form>
        </div>
    )
}

export default SearchBar;