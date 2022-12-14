import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import Loader from "../common/loader";



const UserOrders = () => {

    // const { userName } = useParams();
    const {state}=useLocation();
    const history = useHistory()
    const [mainLoader,setmainLoading]=useState(true)
    const [orders, setOrders] = useState([]);

    const getOrders = useCallback(() => {
        setTimeout(()=>{
            Axios.get('https://foodlab-services.onrender.com/meals/orders/' + state.userName).then((result) => {
                //   console.log(result)
                setOrders(result.data)
                setmainLoading(false)
            }).catch((error) => {
                console.log(error)
            })
        },1000)

    },[state.userName])


    useEffect(() => {
        getOrders()
    }, [getOrders])


    const cancelOrder=(order_id)=>{
        Axios.put('https://foodlab-services.onrender.com/orders/cancel-order',{
            order_id
        }).then((result)=>{
            if(result.statusText==='OK' || result.status===200)
            getOrders()
        }).catch(error=>console.log(error))
    }



    
    const goBack = () => {
        history.push('/viewFood', {
            state: state.userName
        })
    }
    
    if(mainLoader){
        return <div className="d-flex justify-content-center align-items-center">
           <Loader/>
        </div>
    }
    return (<>
        <div className="container-fluid section-3">
            <div className="container">
                <h3>Order History</h3>
                <div className="d-flex mb-3">
                    <button onClick={goBack} className='btn btn-danger'>Back</button>

                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Food Name</th>
                            <th>Size</th>
                            <th>Amount</th>
                            <th>Ready Time</th>
                            <th></th>
                        </tr>

                    </thead>


                    <tbody>
                        {
                            orders.map((order) => {
                                const {name,size,order_id,amount,predicted_time}=order;

                                return <tr key={order_id}>
                                    <td>{name}</td>
                                    <td>{size}</td>
                                    <td>{amount}</td>
                                    <td>{predicted_time}</td>
                                    <td><button className="btn btn-success" onClick={()=>{cancelOrder(order.order_id)}} >Cancel</button></td>
                                </tr>
                            })
                        }
                     
                    </tbody>

                </table>
            </div>
        </div>
    </>);
}

export default UserOrders;