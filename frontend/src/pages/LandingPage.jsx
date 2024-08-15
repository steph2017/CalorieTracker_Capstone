import { Link } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import ExpandedLog from "../components/ExpandedLog";

import React from 'react'

function LandingPage({ allUsers, user, allLogs, logs, setUser, setLogs }) {
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <UserHeader allLogs={allLogs} allUsers={allUsers} logs={logs} user={user} setUser={setUser} setLogs={setLogs} />
            <ExpandedLog allLogs={allLogs} allUsers={allUsers} logs={logs} user={user} setUser={setUser} setLogs={setLogs} />
        </div>
    )
}

export default LandingPage