import React, { useEffect, useState } from "react";
import Axios from "axios";
import {Link} from 'react-router-dom'

const Orders = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getOrders()
     
    }, [])
    const getOrders = () => {
        
        

        Axios.get('http://localhost:3001/orders/get-orders').then((result) => {
            setOrders(result.data)

        }).catch(err => console.log(err))
        

    }
    const complete=(order)=>{
        console.log(order);
        Axios.put('http://localhost:3001/orders/complete-order',{
            order
        }).then((result)=>{
            if(result.statusText==='OK'){
                getOrders();
            }
        })
    }
    return (
        <div className="container-fluid section-3">
            <div className="container">
                <div className="d-flex mb-3">
   
                    <Link className="btn btn-primary me-3" to='/add-food'>Add Food</Link>
                    <Link className="btn btn-success" to='/admin-home'>Back</Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Food Name</th>
                            <th>Size</th>
                            <th>Amount</th>
                            <th>Mark</th>
                        </tr>

                    </thead>


                   <tbody>
 {
                        orders.map((order)=>{
                            const {name,size,order_id,amount}=order;
                            
                            return <tr key={order_id}>
                                 <td>{order_id}</td>
                                 <td>{name}</td>
                                 <td>{size}</td>
                                 <td>{amount}</td>
                                 <td><button className="btn btn-success" onClick={()=>complete((order))}>Complete</button></td>
                            </tr>
                        })
                    }
                   </tbody>

                </table>
            </div>
        </div>
    );
}

export default Orders;