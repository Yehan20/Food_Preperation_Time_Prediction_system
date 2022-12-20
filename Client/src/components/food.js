import React, { useEffect, useState } from 'react';
import Meal from './meal';
import useCustomFetch from '../custom-hooks/useCustomFetch';
import UserNav from './userNav';
import { useLocation} from 'react-router-dom';
import { useCallback } from 'react';
import Loader from '../common/loader';


const Food = () => {


    const {state} = useLocation()
    // console.log(state);

    const [userName,setUsername]=useState('')

   

    const { meals, error } = useCustomFetch('https://foodlab-services.onrender.com/meals')

    const [mealList, setMealList] = useState([])
    const [isfilter, setIsFilter] = useState(false)
    const [category, setCategory] = useState('main')
    const [activeItem, setActiveItem] = useState('main');

          
    const filterItems = useCallback(() => {

        setActiveItem(category)

        const newMeals = meals.filter((meal) => meal.category === category)
        setMealList(newMeals)
        setIsFilter(true)
    },[category,meals])
    
    
    useEffect(() => {

        filterItems()
    }, [category,filterItems])

    useEffect(() => {
        setIsFilter(false)
        setActiveItem('all')
        // setActiveItem('all') 
        setUsername(state.state)
    }, [state.state])





    return (
        
        <>
           <UserNav userName={userName}/>
            <div className='container-fluid section-1'>
                <div className="container mb-3">
                    <div className="d-flex flex-column flex-md-row  gap-2 justify-content-center">

                        <button className={`btn btn-primary mx-3 ${activeItem === 'main' ? 'active' : ''}`} value='main' onClick={(e) => (setCategory(e.target.value))}>Main</button>
                        <button className={`btn btn-primary mx-3 ${activeItem === 'appetizer' ? 'active' : ''}`} value='appetizer' onClick={(e) => (setCategory(e.target.value))}>Appetizer</button>
                        <button className={`btn btn-primary mx-3 ${activeItem === 'bite' ? 'active' : ''}`} value='bite' onClick={(e) => (setCategory(e.target.value))}>Bites</button>
                        <button className={`btn btn-primary mx-3 ${activeItem === 'dessert' ? 'active' : ''}`} value='dessert' onClick={(e) => (setCategory(e.target.value))}>Dessert</button>
                    </div>
                    <h3 className='my-3 text-center'>Choose the Meal</h3>
                    <div className="meal-box">

                        {error && <div>
                            <Loader/>
                              {/* <h2 className='text-primary'>Loading...</h2> */}
                       
                          </div>}
                        {!isfilter &&
                            meals.map((meal) => {
                                return <Meal meal={meal} userName={userName} key={meal.id}/>
                            })
                        }
                        {isfilter &&
                            mealList.map((meal) => {
                                return <Meal meal={meal} userName={userName} key={meal.id}/>
                            })
                        }

                    </div>
                </div>
            </div>
        </>

    );
}



export default Food;