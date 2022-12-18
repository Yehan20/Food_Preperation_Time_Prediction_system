import React from 'react';
import { Link } from 'react-router-dom'
import useCustomFetch from '../custom-hooks/useCustomFetch';

const FoodList = () => {
    // locat url http://localhost:3001/
    // https://foodlab-services.onrender.com
    const {meals,error}=useCustomFetch('https://foodlab-services.onrender.com/meals')
    return (

        <div className="container">
            <div className="d-flex justify-content-center flex-column flex-md-row  gap-2 ">
  
                <Link to='/add-food' className='btn btn-primary'>Add food</Link>
                <Link to='/orders' className='btn btn-success mx-0 mx-md-3'>Complete Orders</Link>
                <Link to='/' className='btn btn-danger'>Go Home | Logout</Link>
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