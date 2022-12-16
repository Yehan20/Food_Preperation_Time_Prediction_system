import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return ( <>
       <h1 className="text-danger text-center text-lg">404 Error Page  Not Found :(
          <br/> <Link to='/'>Go Home</Link>
         </h1>
    </> );
}
 
export default NotFound;