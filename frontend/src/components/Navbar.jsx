import { Link } from "react-router-dom";
import React from 'react'

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/view/food">
                <div>VIEW/EDIT FOODS</div>
            </Link>
            <Link to="/view/log">
                <div>VIEW/EDIT LOGS</div>
            </Link>
            <Link to="/view/user">
                <div>VIEW/EDIT USERS</div>
            </Link>
            <Link to="/add/food">
                <div>ADD FOOD</div>
            </Link>
            <Link to="/add/log">
                <div>ADD LOG</div>
            </Link>
            <Link to="/add/user">
                <div>ADD USER</div>
            </Link>
            <Link to="/">
                <div>HOME</div>
            </Link>
        </div>
    )
}

export default Navbar