import React, { useEffect, useState } from 'react';
import Axios from 'axios'



const useCustomFetch = (url) => {
    const [meals, setMeals] = useState([])
    const [error,setError]=useState(true)
    useEffect(() => {
       setTimeout(()=>{
            Axios.get(url).then((result) => {

                setMeals(result.data)
                setError(false)

            }).catch((err) => {
                console.log(err)

            })
       },1000)

    }, [url])
    return {
        meals,error
    }
}
export default useCustomFetch