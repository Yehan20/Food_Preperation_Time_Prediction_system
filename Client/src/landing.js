import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <>
        <nav className="nav">
            <div className="container-fluid">
                <div className="row">
                  
                    <div className="col-12 col-sm-9 col-md-8 p-0">
                        <nav className="navbar navbar-expand-md p-0  ">
                            <a className="navbar-brand d-block d-md-none" href="#">Menu</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                                <ul className="navbar-nav" data-aos="fade-left">
                                    <li className="nav-item active">
                                    
                                        <Link className='nav-link' to='/'>Home</Link>
                                        
                                    </li>
                                    <li className="nav-item">
                                     
                                        <Link className='nav-link' to='/login'>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                      
                                        <Link className='nav-link' to='/sign-up'>Sign Up</Link>
                                    </li>
                                
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </nav>
            <div id="slider" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#slider" data-slide-to="0" className="active"><span></span></li>
              <li data-target="#slider" data-slide-to="1"><span>1</span></li>
             
            </ol>
      
            <div className="carousel-inner">
       
              <div className="carousel-item active">
                <img className="d-block w-100" src="slider-img/slider-1.jpg" alt='Image' />
    
              </div>
    
         
      
            </div>
          </div>
        </>
    );
}

export default NavBar;