import React from 'react';
import Food from './food';
import AddFood from './addFood';
import SpecificMeal from './onemeal';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FoodList from './foodList';
import Orders from './oders';

function App() {

  return (
    <Router>
      <main>
        <h1 className='text-center'>Food Labs (FPT) System</h1>
        <Switch>
          <Route exact path='/'>
            <FoodList />
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
    </Router>

  )
}

export default App
