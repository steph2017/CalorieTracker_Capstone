import React from 'react'
import '../App.css'

function UserHeader({ user }) {
    return (
        <div className="user-header-card">
            <div className="user-header-body">
                <div className="left-division">
                    <h4>Welcome Back {user.username}!</h4>
                    <img src={"https://www.pexels.com/photo/grayscale-photo-of-man-wearing-denim-jacket-1040880/"} alt={`${user.username}`} className="user-image" />
                </div>
                <div className="right-division">
                    <h4>Your Daily Targets</h4>
                    <div className="target-grid">
                        <div className="target-square">Total Calories: {user.tarCals}</div>
                        <div className="target-square">Carbs: {user.tarCarbs}</div>
                        <div className="target-square">Protein: {user.tarProtein}</div>
                        <div className="target-square">Fat: {user.tarFat}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHeader