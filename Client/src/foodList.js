import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom'
import useCustomFetch from './useCustomFetch';

const FoodList = () => {
    const {meals,error}=useCustomFetch('http://localhost:3001/meals')


    return (

        <div className="container">
            <div className="d-flex justify-content-center">
                <Link to='/add-food' className='btn btn-primary mx-3'>Add food</Link>
                <Link to='/orders' className='btn btn-success'>Complete Orders</Link>
            </div>
            <div className="meal-box">
                {error && <h2 className='text-primary'>Loading ...</h2>}
                {  
                !error &&
                    meals.map((meal) => {
                        const { name, category, src, description, price, id } = meal
                        return <div className='card w-100' key={id}>

                            <h3>{name}</h3>
                            <img src={src} alt={name} className="img-fluid" />
                            <h4>{category}</h4>
                            <p>{description}</p>
                            <p>RS:{price}</p>

                        </div>
                    })
                }
                
            </div>

        </div>

    );
}

export default FoodList;