import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";


const SpecificMeal = () => {
    useEffect(() => {
        getMeal()
        IncompleteOrders()

    }, [])




    const { id } = useParams()
   
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


    const [canOrder, setcanOrder] = useState(false)
    const [ordered,setOrdered]=useState(false)
  

    const [data, setData] = useState('');
    const [time, setTime] = useState('');
    const [real, setReal] = useState('')
    const [day, setDay] = useState(new Date().getHours() * 60 + new Date().getMinutes())

    useEffect(() => {
        let resturant_open_hrs = hrs + 8
        setReal(resturant_open_hrs)
        setDay(60 * resturant_open_hrs)
    }, [hrs])


    const timeConvert = (min) => {
        let num = min;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return " Food will be avaiable at  " + rhours + ":" + rminutes + "";
    }



    // Sending the data to the machne learning model in our flask serverr
    const findTime = (e) => {
        e.preventDefault();
        Axios.post('/time', {

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
            if (result.statusText === "OK") {
                console.log("request send");
                let newTime = timeConvert(result.data + day)

                setData(newTime);
                setTime(Math.round(result.data));
                setcanOrder(true)
                setOrdered(false)

            }
        }).catch((error) => console.log(error))
    }



    const getMeal = () => {
        Axios.get('http://localhost:3001/meals/meal/' + id).then((result) => {

            setMeal(result.data[0])
            setFoodName(result.data[0].name)
            setCategory(result.data[0].category)
            setVeg(result.data[0].veg)
            setNonVeg(veg === 1 ? 0 : 1)
        }).catch(err => console.log(err))
    }

    const IncompleteOrders = () => {
        Axios.get('http://localhost:3001/orders/get-incomplete-orders').then((result) => {

            setincompleteOrds(result.data)

        }).catch(err => console.log(err))
    }

    const makeOrder = () => {
        Axios.post('http://localhost:3001/orders/add-order', {
            foodName,
            foodAmt,
            size,
            exp


        }).then((result) => {
            if (result.statusText === "OK") {
                IncompleteOrders()
                setOrdered(true)
                
            }
        }).catch(err => console.log(err))
    }

    return (
        <>
            <div className="zoomedCard " key={meal.id}>
                <div className="info">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2>{meal.name}</h2>
                        <Link to='/viewFood' className='btn btn-danger'>Back</Link>
                    </div>
                    <img src={meal.src} className='img-fluid' alt="name" />
                    <h3>{meal.category}</h3>
                    <p>
                        {meal.description}
                    </p>
                    <strong>RS:{meal.price}</strong>
                </div>
                <div>
                    <form onSubmit={(e) => findTime(e)}>
                        <div className="d-flex">

                            <div className="mb-3 w-100">
                                <label className="form-label">Food Amount</label>
                                <input required  type="number" className="form-control" id="exampleFormControlInput1" onChange={(e) => setFoodAmt(e.target.value)} />
                            </div>
                            <div className="mb-3 w-100">
                                <label className="form-label">Placing Order Time Slot</label>
                            
                                <select required  className="form-select" aria-label="Default select example" onChange={(e) => sethrs(e.target.value - 8)}>
                                    <option value="" hidden>Choose</option>
                                    <option value={new Date().getHours()}>Right Now</option>
                                    <option value="8">8:00 - 8:30</option>
                                    <option value="9">9:00 - 9:30</option>
                                    <option value="10">10:00 - 10:30</option>
                                    <option value="11">11:00 - 11:30</option>
                                    <option value="12">12:00 - 12:30</option>
                                    <option value="13">13:00 - 13:30</option>
                                    <option value="14">14:00 - 14:30</option>
                                    <option value="15">15:00 - 15:30</option>
                                    <option value="16">16:00 - 16:30</option>
                                    <option value="17">17:00 - 17:30</option>
                                    <option value="18">18:00 - 18:30</option>
                                    <option value="19">19:00 - 19:30</option>
                                    <option value="20">20:00 - 20:30</option>
                                    <option value="21">21:00 - 21:30</option>
                                    <option value="22">22:00 - 22:30</option>

                                </select>
                            </div>
                        </div>

                        <div className="d-flex">

                            <div className="mb-3 w-100">
                                <label className="form-label">Food Size</label>
                                <select required  className="form-select"  aria-label="Default select example" onChange={(e) => setSize(e.target.value)}>
                                    <option value="" hidden>Choose</option>
                                    <option value="nm">Normal (NM)</option>
                                    <option value="lg">Large (LG)</option>
                                    <option value="xl">Extra Large (XL)</option>
                                </select>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="mb-3 w-100">

                                <label className="form-label">Choose Cheif experience</label>
                                <select  required className="form-select"  aria-label="Default select example" onChange={(e) => setExp(e.target.value)}>
                                    <option value="" hidden> Choose a Chef</option>
                                    <option value="junior">👨‍🍳 Cheif</option>
                                    <option value="senior">👨‍🍳 Cheif 2 </option>
                                </select>
                            </div>
                        </div>
                        <div className="">
                            <div className="d-flex">
                                <button className="btn btn-primary w-100 text-white" type='submit'>
                                    Predict Time
                                </button>
                            
                              
                                   
                                    <button className="btn btn-success w-100 text-white" title={canOrder?'You need to Check the Time first!!':''} disabled={!canOrder && true} type='button' onClick={makeOrder}>
                                    Order
                                </button>

                               
                            </div>

                            { !canOrder &&<p className="text-danger text-center mt-3">Please Find the Ready time to Make order</p> }

                        </div>

                        {data &&
                            <p className='text-success mi-text text-lg  text-center text-bold'>
                                Your meal would take <span className="text-danger">{time}</span> minutes to be made <br />
                                and <span className="text-primary">{data}</span>
                            </p>
                        }
                        {
                            ordered && <p className="text-center text-primary text-bold text-lg">Order Placed </p>
                        }

                    </form>

                </div>
            </div>

        </>
    );
}

export default SpecificMeal;