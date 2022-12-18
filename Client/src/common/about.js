import React from "react";
import { Link } from "react-router-dom";
import useCustomFetch from '../custom-hooks/useCustomFetch';

const About = () => {
    const { meals, error } = useCustomFetch('https://foodlab-services.onrender.com/meals')
    return (
        <>
            <div className="containfer-fluid section-2">
                <h3 className="text-center">Welcome to Our Shop</h3>
                
                <div className="d-flex justify-content-center">
                    <Link className='btn btn-primary' title="Click to visit"  to='/login'>Login</Link>
                    <Link className='btn btn-primary mx-4' title="Click to visit"  to='/viewFood'>Demo Run</Link>
                    <Link className='btn btn-primary' title="Click to visit"  to='/sign-up'>Sign Up</Link>
                </div>
                <h3 className="text-center  mt-4">Admin Login</h3>
                <div className="d-flex justify-content-center">
                    <Link className='btn btn-danger' title="Click to visit"   to='/admin-home'>Admin Login Demo</Link>
                </div>

            </div>
            <div className="container-fluid section-3">
                <div className="container">
                    <div className="row my-6">
                        <div className="col-md-6 col-12">
                            <div className="img-container">
                                <img src="slider-img/logo.jpg" className="img-fluid w-100" alt='about' />
                            </div>
                        </div>
                        <div className="col-md-6 col-12 about-container d-flex flex-column justify-content-center">
                            <h3>About Us</h3>
                            <p>
                                Food Labs is the Best food restruant in town ,  With an Ai based system to predict the food preparation time
                                Now No need to ask when will the meals will be ready. You can get all the information before you make an order.
                            </p>
                            <p className="my-3">
                                Our Smart System uses machine learning technology to to give you the accraest time your order will be ready for you to collect
                                before even you can place the order. so you can easily make a decision based on your time. you can choose from which cheif you want to make your order
                                also you can view the results for different times of the day without waiting for that time XDDD
                            </p>
                            <p>
                                With data from your side and the current status of the resturant are taken as factors that our trained model uses to 
                                find the prepration time and give to you.
                            </p>
                        </div>
                    </div>
                    <div className="row my-4">
                        <h3 className="text-center">Our Meals</h3>
                        <div className="meal-box col-md-12">

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
            </div>
        </>


    );
}

export default About;