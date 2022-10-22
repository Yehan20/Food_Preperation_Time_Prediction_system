import React from "react";
import useCustomFetch from '../custom-hooks/useCustomFetch';
const About = () => {
    const {meals,error}=useCustomFetch('http://localhost:3001/meals')
    return (
        <div className="container-fluid section-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="img-container">
                            <img src="slider-img/logo.jpg" className="img-fluid w-100" alt='about' />
                        </div>
                    </div>
                    <div className="col-md-6 col-12 about-container d-flex flex-column justify-content-center">
                        <h3>About Us</h3>
                        <p>
                            Food Labs is the Best food restruant in town ,  With an Ai based system to predict the food preparation time
                        </p>
                        <p>
                            Originally established in the 1999, </p>
                    </div>
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
        </div>

    );
}

export default About;