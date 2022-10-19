import React, { useEffect, useState } from 'react';
import Meal from './meal';
import useCustomFetch from './useCustomFetch';


const Food = () => {
  
    const {meals}=useCustomFetch('http://localhost:3001/meals')

    return (
        <div className='container-fluid section-1'>
            <div className="container">
                <div className="meal-box">
                    {
                        meals.map((meal) => {
                            return <Meal meal={meal} key={meal.id} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Food;