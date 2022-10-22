import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Food from './components/food';
import AddFood from './components/addFood';
import SpecificMeal from './components/onemeal';
import FoodList from './components/foodList';
import Orders from './components/oders';
import Login from './common/login';
import SignUp from './common/signUp';
import NavBar from './common/landing';
import Footer from './common/footer';
import About from './common/about';



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
