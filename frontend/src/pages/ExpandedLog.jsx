import { Link } from "react-router-dom";
import UserHeader from "../components/UserHeader";

import React from 'react'

function ExpandedLog({ users, user, logs, setUser }) {
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <UserHeader user={user} />
        </div>
    )
}

export default ExpandedLog