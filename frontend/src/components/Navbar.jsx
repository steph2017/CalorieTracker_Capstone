import { Link } from "react-router-dom";
import React from 'react'

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/selectuser">
                <div>LOG IN AS...</div>
            </Link>
            <Link to="/view/log">
                <div>VIEW/EDIT...</div>
            </Link>
            <Link to="/add/food">
                <div>ADD...</div>
            </Link>
            <Link to="/">
                <div>HOME</div>
            </Link>
        </div>
    )
}

export default Navbar