import React, { useCallback, useEffect, useState } from "react";
import {useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import loader from '../assets/preparing.gif'



const SpecificMeal = () => {


    const history = useHistory();
    const {state} = useLocation()
 
   
    // Data for the AI model
    const [meal, setMeal] = useState({})
    const [foodName, setFoodName] = useState('')
    const [category, setCategory] = useState('')
    const [size, setSize] = useState('')
    const [foodAmt, setFoodAmt] = useState('')
    const [veg, setVeg] = useState('')
    const [nonVeg, setNonVeg] = useState('')
    const [incompleteOrdrs, setincompleteOrds] = useState('')
    const [exp, setExp] = useState('')
    const [hrs, sethrs] = useState('')
    const [username,setuserName]=useState('')


    const [canOrder, setcanOrder] = useState(false)
    const [ordered, setOrdered] = useState(false)


    const [data, setData] = useState('');
    const [time, setTime] = useState('');
   // const [real, setReal] = useState('')
    const [day, setDay] = useState(new Date().getHours() * 60 + new Date().getMinutes())

    const [loading, setLoading] = useState(false)
    

    //Asume the Resturants opens and 8:00 am//
    
    useEffect(() => {
        let resturant_open_hrs = hrs + 8
        //setReal(resturant_open_hrs)
        setDay(60 * resturant_open_hrs + new Date().getMinutes())
    }, [hrs])


    const timeConvert = (min) => {
        let num = min;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return "" + rhours + ":" + rminutes + "";
    }

    // Sending the data to the machne learning model in our flask serverr
    const findTime = (e) => {
        e.preventDefault();
        setLoading(!loading)
        setTimeout(() => {
            // flask api
            // axios({
            //     method: 'get',
            //     url: `https://api.someurl.com/subject/v2/resource/somevalue`,
            //     withCredentials: false,
            //     params: {
            //       access_token: SECRET_TOKEN,
            //     },
            //   });

            Axios.post('https://foot-prep-time-service-yn.onrender.com/time', {
              
                foodName,
                foodAmt,
                hrs,
                incompleteOrdrs,
                category,
                size,
                veg,
                nonVeg,
                exp

            }).then((result) => {
                setLoading(false)
                if (result.statusText === "OK") {
                    console.log("request send");
                    let newTime = timeConvert(result.data + day)
                    
                    setData(newTime);
                    setTime((result.data.toFixed(2)));
                    setcanOrder(true)
                    setOrdered(false)

                }
            }).catch((error) => console.log(error))
        }, 3500)

    }

   const [error,setError]=useState(false)
    const getMeal = useCallback(() => {
        Axios.get('http://localhost:3001/meals/meal/' + state.id).then((result) => {
           if(result.data.length===0){
              setError(true)
              result=[]
           }
            setMeal(result.data[0])
            setFoodName(result.data[0].name)
            setCategory(result.data[0].category)
            setVeg(result.data[0].veg)
            setNonVeg(Number(!Boolean(Number(result.data[0].veg)))) 

        }).catch(err => console.log('error',err))
    },[state.id])

    const IncompleteOrders = () => {
        Axios.get('http://localhost:3001/orders/get-incomplete-orders').then((result) => {

            setincompleteOrds(result.data)

        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getMeal()
        IncompleteOrders()

    }, [getMeal])


    const makeOrder = () => {
        Axios.post('http://localhost:3001/orders/add-order', {
            foodName,
            foodAmt,
            size,
            exp,
            data,
            username
        }).then((result) => {
            if (result.statusText === "OK") {
                IncompleteOrders()
                setOrdered(true)
                document.querySelectorAll('input').value = ''

            }
        }).catch(err => console.log(err))
    }


    const goBack = ()=>{
         history.push('/viewFood',{
            state:state.username
           })
    }

    
            console.log('vegetation',veg);
            console.log('non vegitarion',nonVeg)

    return (
        <>
       
        {
            !error &&
            <div className="zoomedCard" key={meal.id}>
            <div className="info">
                <div className="d-flex align-items-center mb-3 justify-content-between">
                    <h2>{meal.name}</h2>
                    <button onClick={goBack}className='btn btn-danger'>Back</button>
                </div>
                <img src={meal.src} className='img-fluid' alt={meal.name} />
                <h3>{meal.category}</h3>
                <p>
                    {meal.description}
                </p>
                <strong>RS:{meal.price}</strong>
            </div>
            <div>
                <form onSubmit={(e) => findTime(e)}>
                <div className="mb-3 w-100">
                            <label className="form-label">Name</label>
                            <input required type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => setuserName(e.target.value)} />
                        </div>
                    <div className="d-flex flex-md-row flex-column">
                
                        <div className="mb-3 w-100">
                            <label className="form-label">Food Amount</label>
                            <input required type="number" className="form-control" id="exampleFormControlInput1" onChange={(e) => setFoodAmt(e.target.value)} />
                        </div>
                        <div className="mb-3 w-100">
                            <label className="form-label">Placing Order Time Slot</label>

                            <select required className="form-select" aria-label="Default select example" onChange={(e) => sethrs(Number(e.target.value) - 8)}>
                                <option value="" hidden>Choose</option>
                                <option value={new Date().getHours() }>Right Now</option>
                                <option value="8">8:{new Date().getMinutes()}</option>
                                <option value="9">9:{new Date().getMinutes()}</option>
                                <option value="10">10:{new Date().getMinutes()}</option>
                                <option value="11">11:{new Date().getMinutes()}</option>
                                <option value="12">12:{new Date().getMinutes()}</option>
                                <option value="13">13:{new Date().getMinutes()}</option>
                                <option value="14">14:{new Date().getMinutes()}</option>
                                <option value="15">15:{new Date().getMinutes()}</option>
                                <option value="16">16:{new Date().getMinutes()}</option>
                                <option value="17">17:{new Date().getMinutes()}</option>
                                <option value="18">18:{new Date().getMinutes()}</option>
                                <option value="19">19:{new Date().getMinutes()}</option>
                                <option value="20">20:{new Date().getMinutes()}</option>
                                <option value="21">21:{new Date().getMinutes()}</option>
                                <option value="22">22:{new Date().getMinutes()}</option>

                            </select>
                        </div>
                    </div>

                    <div className="d-flex">

                        <div className="mb-3 w-100">
                            <label className="form-label">Food Size</label>
                            <select required className="form-select" aria-label="Default select example" onChange={(e) => setSize(e.target.value)}>
                                <option value="" hidden>Choose</option>
                                <option value="nm">Normal (NM)</option>
                                <option value="lg">Large (LG)</option>
                                <option value="xl">Extra Large (XL)</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="mb-3 w-100">

                            <label className="form-label">Choose Cheif </label>
                            <select required className="form-select" aria-label="Default select example" onChange={(e) => setExp(e.target.value)}>
                                <option value="" hidden> Choose a Chef</option>
                                <option value="junior">Nimesh</option>
                                <option value="senior"> Malith </option>
                            </select>
                        </div>
                    </div>
                    <div className="">
                        <div className="d-flex">
                            <button className="btn btn-primary w-100 text-white" type='submit'>
                                Predict Time
                            </button>



                            <button className="btn btn-success w-100 text-white" disabled={!canOrder && true} type='button' onClick={makeOrder}>
                                Order
                            </button>


                        </div>

                        {!canOrder && <p className="text-danger text-center mt-3">Please Find the Ready time to Make order</p>}

                    </div>
                    {loading && <div className="d-flex flex-column align-items-center justify-content-start">
                        <img src={loader} alt='loader' className='loader' />
                        <span>Pleast wait ..</span>
                    </div>}
                    {data &&
                        <p className='text-success mi-text text-lg  text-center text-bold '>
                            Your meal would take <span className="text-danger">{time}</span> minutes to be made <br />
                            and <span className="text-primary">Food will be avaiable at  {data}</span>
                        </p>
                    }
                    {
                        ordered && <p className="text-center mi-text text-warning text-bold text-lg">Order Placed  </p>
                    }

                </form>

            </div>
        </div>
        }
         

        </>
    );
}

export default SpecificMeal;