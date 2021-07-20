import React, { useState } from "react";

const ToolTip = (props) => {
    const [media, setMedia] = useState([]);


   

    return (
        <div className="toolTip">
            <h5>{props.name}</h5>

        </div>
    )
}

export default ToolTip;