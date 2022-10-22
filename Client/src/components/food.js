import React, { useEffect, useState } from 'react';
import Meal from './meal';
import useCustomFetch from '../custom-hooks/useCustomFetch';


const Food = (props) => {
    console.log(props)
    const { username} =
    (props.location && props.location.username) || {};
    console.log(props.location);
  
    const {meals,error}=useCustomFetch('http://localhost:3001/meals')
    const [mealList,setMealList]=useState([])

    // useEffect(()=>{
    //    setTimeout(()=>{
    //     setMealList(meals)
    //    },2000) 
    // },[])
  

    const filterItems=(category)=>{
        const newMeals = meals.filter((meal)=>meal.category===category)
        setMealList(newMeals)
        
    }

    return (
        <div className='container-fluid section-1'>
            <div className="container mb-3">
            <div className="d-flex justify-content-center">
                    <button className='btn btn-primary mx-3' value='main' onClick={(e)=>filterItems(e.targetValue)}>Main</button>
                    <button className='btn btn-primary mx-3' value='appetizer' onClick={(e)=>filterItems(e.targetValue)}>Appetizer</button>
                    <button className='btn btn-primary mx-3' value='bites' onClick={(e)=>filterItems(e.targetValue)}>Bites</button>
                    <button className='btn btn-primary mx-3' value='dessert' onClick={(e)=>filterItems(e.targetValue)}>Dessert</button>
                  </div>
                <div className="meal-box">
               
                   {error && <h2 className='text-primary'>Loading...</h2>}
                    {!error &&
                        meals.map((meal) => {
                            return <Meal meal={meal} key={meal.id} />
                        })
                    }
                    {
                        mealList &&
                        mealList.map((meal) => {
                            return <Meal meal={meal} key={meal.id} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Food;