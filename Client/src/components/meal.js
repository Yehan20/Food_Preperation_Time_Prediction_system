import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Meal = ({meal}) => {

    const { name, category, src, description, price, id } = meal
    return <div className='card w-100' key={id}>
        <Link to={`order-food/${id}`}>
            <h3>{name}</h3>
            <img src={src} alt={name} className="img-fluid" />
            <h4>{category}</h4>
            <p>{description}</p>
            <p>RS:{price}</p>
        </Link>
    </div>

}

export default Meal;