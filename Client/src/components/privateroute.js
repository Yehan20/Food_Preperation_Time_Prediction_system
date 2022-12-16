
import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({component:Component,...rest}) => {
    const {state} = useLocation()


    if(state===undefined){
        return <Route><Redirect to='/login'/></Route>
    }

    return (  
        <Route 
        
        render={props=>{
    
          return  <Component {...props} /> 
        }}></Route>
          
        
    );
}
 
export default PrivateRoute;