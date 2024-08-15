import React from 'react'
import { useEffect } from 'react'

function ExpandedLog({ singlelog }) {

    console.log(singlelog);
    console.log(typeof singlelog.date); // Should be string or number
    console.log(singlelog.date);
    console.log(singlelog.food_ids);
    console.log(Array.isArray(singlelog.food_ids));


    function formatDate(logDate) {
        const dateStr = logDate.toString();

        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);

        const formattedDate = new Date(`${year}-${month}-${day}`);

        return formattedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    if (!singlelog || !singlelog.metcalTarget || !singlelog.food_ids) {
        return <div>loading...</div>;
    }

    let calsLeftClass = 'cals-left';
    if (!singlelog.metcalTarget) {
        calsLeftClass += singlelog.calsLeft < 0 ? ' cl-red' : ' cl-purple';
    } else {
        calsLeftClass += ' cl-green';
    }


    return (
        <div className="expandedlog">
            <h2>Date of Log: {singlelog.date}</h2>
            <div className={calsLeftClass}>{singlelog.calsLeft}</div>
            <div>Daily Calories Left</div>

            <div className="el-container">
                <div className="el-card">Total Calories: {singlelog.tCals}</div>
                <div className="el-card">Carbs: {singlelog.tgCarbs}g</div>
                <div className="el-card">Protein: {singlelog.tgProtein}g</div>
                <div className="el-card">Fat: {singlelog.tgFat}g</div>
            </div>
            {/* <div className="food-card-container">
                {String(singlelog.food_ids)}
            </div> */}

            <div className="food-card-container">
                {singlelog.food_ids.map((food, index) => (
                    <div key={index} className="food-card">
                        <div className="food-card-left">
                            <img src={food.photo_url} alt={food.name} style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
                        </div>
                        <div className="food-card-right">
                            <h3>{food.name}</h3>
                            <p>{food.description}</p>
                            <p>Calories: {food.cals} Carbs: {food.gcarbs}g Protein: {food.gprotein}g Fat: {food.gfat}g</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        // <div>deleteme</div>
    );
}

export default ExpandedLog