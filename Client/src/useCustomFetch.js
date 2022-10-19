import React, { useEffect, useState } from 'react';
import Axios from 'axios'



const useCustomFetch = (url) => {
    const [meals, setMeals] = useState([])
    useEffect(() => {

        Axios.get(url).then((result) => {

            setMeals(result.data)

        }).catch(err => console.log(err))
    }, [url])
    return {
        meals
    }
}
export default useCustomFetch