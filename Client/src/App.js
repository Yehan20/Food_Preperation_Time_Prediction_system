import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Food from './food';
import AddFood from './addFood';
import SpecificMeal from './onemeal';
import FoodList from './foodList';
import Orders from './oders';
import Login from './login';
import SignUp from './signUp';
import NavBar from './landing';
import Footer from './footer';
import About from './about';



function App() {

  return (
    <Router>
      <main>
        <NavBar/>
        <h1 className='text-center'>Food Labs</h1>
        <Switch>
          <Route exact path='/'>
             <About/>
           
          </Route>
         </Switch>

  
        <Switch>
          <Route  path='/admin-home'>
            <FoodList />
          </Route>
         </Switch>

         <Switch>
          <Route path='/login'>
             <Login/>
          </Route>
         </Switch>

         <Switch>
          <Route path='/sign-up'>
             <SignUp/>
          </Route>
         </Switch>

        <Switch>
          <Route path='/viewfood'>
            <Food />
          </Route>
        </Switch>

        <Switch>
          <Route path='/add-food'>
            <AddFood />
          </Route>
        </Switch>

        <Switch>
          <Route path='/orders'>
            <Orders/>
          </Route>
        </Switch>

        <Switch>
          <Route path='/order-food/:id'>
            <SpecificMeal />
          </Route>
        </Switch>
      </main>
      <Footer/>
    </Router>

  )
}

export default App
