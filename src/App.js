import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'tailwindcss/dist/tailwind.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'


//Pages  
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Home from './pages/Home';
import Product from './pages/Product';
import Catalog from './pages/Catalog';

import About from './pages/About';

//Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//App Components
import AppNavBar from './components/AppNavBar';
import Footer from './components/Footer';
import ProductCart from './components/ProductCart';

//admin dashboard related
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

import ProductDetails from './pages/ProductDetails';

//
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import UpdatePassword from './pages/UpdatePassword';
import UpdateProfile from './pages/UpdateProfile';
import ListOrders from './pages/ListOrders';
import OrderDetails from './pages/OrderDetails';

import PageNotFound from './pages/PageNotFound';


//checkout process related
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';



import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import { loadCartItems, loadShippingInfo } from './actions/cartActions';
import store from './store';

import './App.css';
import axios from 'axios';
 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function App(){

  const [stripeAPIKey, setStripeAPIKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    (async () => {
      const { data } = await axios.get(`https://csp3-ecommercev2.herokuapp.com/api/payments/stripeapi`);
      setStripeAPIKey(data.stripeAPIKey);
    })();

  }, [])


  return(
      
     
      <Router>
        <AppNavBar />
        <ProductCart />
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/products" component={Product} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/register" component={Register} />
             {/* <Route exact path="/cart1" component={Cart1} /> */}

            <Route path="/products" component={Catalog} exact />
            <Route path="/cart" component={Cart} isAdmin={false} exact />
            {/* <Route path="/login" component={Login} exact /> */}
            {/* <Route path="/register" component={Register} exact /> */}
            <Route path="/search/:keyword" component={Catalog} exact />
            <Route path="/products/:id" component={ProductDetails} exact />
            <Route path="/password/forgot" component={ForgotPassword} exact />
            <Route path="/password/reset/:token" component={NewPassword} exact />
            <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
            <ProtectedRoute path="/me" component={Profile} exact />
            <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
            <ProtectedRoute path="/order/shipping" component={Shipping } exact />
            <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact />
            <ProtectedRoute path="/order/success" component={OrderSuccess} exact />
            <ProtectedRoute path="/orders/me" component={ListOrders} isAdmin={false} exact />
            <ProtectedRoute path="/orders/:id" component={OrderDetails} exact />
            <ProtectedRoute path="/admin/dashboard" component={Dashboard} isAdmin={true} exact />
            <ProtectedRoute path="/admin/orders" component={OrdersList} isAdmin={true} exact />
            <ProtectedRoute path="/admin/orders/:id" component={ProcessOrder} isAdmin={true} exact />
            <ProtectedRoute path="/admin/products" component={ProductsList} isAdmin={true} exact />
            <ProtectedRoute path="/admin/products/add" component={NewProduct} isAdmin={true} exact />
            <ProtectedRoute path="/admin/products/:id" component={UpdateProduct} isAdmin={true} exact />
            <ProtectedRoute path="/admin/users" component={UsersList} isAdmin={true} exact />
            <ProtectedRoute path="/admin/users/:id" component={UpdateUser} isAdmin={true} exact />
            <ProtectedRoute path="/admin/reviews" component={ProductReviews} isAdmin={true} exact /> 
            <Route path="*" component={PageNotFound} />
            
            {stripeAPIKey && 
              <Elements stripe={loadStripe(stripeAPIKey)}>
                <ProtectedRoute path="/order/payment" component={Payment} exact />
              </Elements>
            } 
         </Switch>

         <Footer />
      </Router>
      
  

  )

}
