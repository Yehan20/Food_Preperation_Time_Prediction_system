import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Meal from './meal';

const Food = () => {
    const [meals, setMeals] = useState([])
    useEffect(() => {
        getMeals()
    }, [])

    const getMeals = () => {
        Axios.get('http://localhost:3001/api/get').then((result) => {

            setMeals(result.data)

        }).catch(err => console.log(err))
    }

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