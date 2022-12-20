import React from 'react';
import { Link, useHistory } from 'react-router-dom';


const Meal = ({ meal,userName }) => {

    const { name, category, src, price, id } = meal
    const history=useHistory()
    const goDetails = (e) => {
        e.preventDefault();
        history.push('/order-food', {
            username: userName,
            id: id
        })
    }

    return <div className='card w-100' key={id}>
        <Link onClick={(e)=>goDetails(e)} to='#'>
            <h3>{name}</h3>
            <img src={src} alt={name} className="img-fluid" />
            <h4>{category}</h4>
            <p>RS:{price}</p>
        </Link>
    </div>

}

export default Meal;