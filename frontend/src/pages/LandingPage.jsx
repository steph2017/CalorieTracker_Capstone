import { Link } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import ExpandedLog from "../components/ExpandedLog";

import React from 'react'

function LandingPage({ allLogs, setAllLogs, userlogs, users, setUsers, user, setUser, singlelog }) {
    if (!user || !singlelog) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <UserHeader allLogs={allLogs} setAllLogs={setAllLogs} userlogs={userlogs} users={users} setUsers={setUsers} user={user} setUser={setUser} singlelog={singlelog} />
            <ExpandedLog allLogs={allLogs} setAllLogs={setAllLogs} userlogs={userlogs} users={users} setUsers={setUsers} user={user} setUser={setUser} singlelog={singlelog} />
        </div>
    )
}

export default LandingPage