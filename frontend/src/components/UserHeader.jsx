import React from 'react'
import '../App.css'

function UserHeader({ user }) {
    return (
        <div className="user-header-card">
            <div className="user-header-body">
                <div className="uh-left-division">
                    <h4>Welcome Back {user.username}!</h4>
                    <img src={"https://unsplash.com/photos/man-wearing-maroon-v-neck-t-shirt-in-forest-agGIKYs4mYs"} alt={`${user.username}`} className="user-image" />
                </div>
                <div className="uh-right-division">
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