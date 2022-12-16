import React from "react";
import { Link, useHistory } from 'react-router-dom'

const UserNav = ({ userName }) => {
    const history = useHistory();
    const gotoOrders = (e) => {
        e.preventDefault();
        history.push('/user-Orders', {
            userName: userName
        })
    }
    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">


                    <ul className="navbar-nav flex-column flex-sm-row">
                        <li>
                            <Link to='/' className='btn btn-danger w-100'>Go Home | Logout</Link>
                        </li>

                        <li className="nav-item">

                            <Link className='nav-link btn' to='#' onClick={(e) => gotoOrders(e)} >View Orders</Link>
                        </li>
                    </ul>


                </div>
            </div>
        </div>

    );
}

export default UserNav;