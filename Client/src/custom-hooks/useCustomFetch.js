import { useEffect, useState } from 'react';
import Axios from 'axios'



const useCustomFetch = (url) => {
    const [meals, setMeals] = useState([])
    const [error,setError]=useState(true)
    useEffect(() => {
   
            Axios.get(url).then((result) => {

                setMeals(result.data)
                setError(false)

            }).catch((err) => {
                console.log(err)

            })
      
       return ()=> {

    
        setMeals([])

       }
    }, [url])
    return {
        meals,error
    }
}
export default useCustomFetch