import React from 'react';
import { Link } from 'react-router-dom';
import recording from '../assets/recording.gif'

const NavBar = () => {

    return (
      <>
      <div className='bg-dark header-nav d-flex justify-content-center align-items-center p-4' >
        <Link to="/">
            <img src="slider-img/logo.jpg" className='img-fluid mini-logo' alt="Logo"/>
        </Link>
        <p className='my-0 mx-3 text-center text-white'>Food Labs Smart Food Ordering System</p>
      </div>
   
            <div id="slider" className="carousel slide" data-ride="carousel">

      
            <div className="carousel-inner">
       
              <div className="carousel-item active">
                <img className="d-block w-100" src="../slider-img/slider-1.jpg"  alt='name'/>
    
              </div>

              <div className="carousel-caption caption-move d-none d-md-flex align-items-center justify-content-around">
                  <img src={recording} alt='Prepearing'  />

                </div>      
            </div>
          </div>
        </>
    );
}

export default NavBar;