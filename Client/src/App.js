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
import NotFound from './common/notFound';
import UserOrders from './components/userOrders';
import PrivateRoute from './components/privateroute';



function App() {

  return (
    <Router>
      <main>
        <NavBar />
        <h1 className='text-center'>Food Labs</h1>
        <Switch>
          <Route exact path='/'>
            <About />
          </Route>

          <Route path='/admin-home'>
            <FoodList />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/sign-up'>
            <SignUp />
          </Route>

          <PrivateRoute path='/viewfood' component={Food} />

          <Route path='/add-food'>
            <AddFood />
          </Route>

          <Route path='/orders'>
            <Orders />
          </Route>

           <PrivateRoute path='/order-food' component={SpecificMeal} />
           <PrivateRoute path='/user-Orders' component={UserOrders} />

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>

  )
}

export default App
