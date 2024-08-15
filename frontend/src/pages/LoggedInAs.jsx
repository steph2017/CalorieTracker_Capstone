import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import React from 'react'
import '../App.css'

function LoggedInAs({ allLogs, setAllLogs, userlogs, users, setUsers, setUserLogs, user, setUser, setLog, singlelog }) {
    const [selectedUserId, setSelectedUserId] = useState(user.id || '');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setSelectedUserId(e.target.value); //in case other selections are made prior to saving
    };

    const handleSave = () => {
        const selectedUser = users.find(user => user.id === Number(selectedUserId));

        if (selectedUser) {
            setUser(selectedUser);

            const selecteduserLogs = allLogs.filter(log => log.user_id === selectedUser.id);
            setUserLogs(selecteduserLogs);

            const lastLog = selecteduserLogs.reduce((prev, current) => (prev.date > current.date ? prev : current), {});
            setLog(lastLog);

            navigate('/');
        }
    };
    return (
        <div className="logged-in-as">
            <img className="user-image" src={user.photo_url} alt={user.username} />
            <p className="lia-header">
                You are currently logged in as: <span style={{ fontWeight: 'bold', color: 'blue' }}>{user.username}</span>
            </p>
            <select className="lia-dropdown" value={selectedUserId} onChange={handleChange} >
                {users.map(u => (
                    <option key={u.id} value={u.id}>{u.username}</option>
                ))}
            </select>
            <button className="lia-save-button" onClick={handleSave}>Save</button>
        </div>
    );
}

export default LoggedInAs