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
import Spinner from './components/layout/Spinner';

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

import ProtectedRoute from './components/route/ProtectedRoute';

import { loadUser } from './actions/userActions';
import { loadCartItems, loadShippingInfo } from './actions/cartActions';
import store from './store';

import './App.css';
import axios from 'axios';

import ScrollToTop from './components/util/ScrollToTop';
 

export default function App(){


  useEffect(() => {

    store.dispatch(loadUser());

  }, [])


  return(
      
     
      <Router>

        <ScrollToTop />
        <AppNavBar />
        <ProductCart />
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/cart" component={Cart} isAdmin={false}  />
            <Route exact path="/search" component={Catalog} ignoreTerm={false} />
            <Route exact path="/search/:keyword" component={Catalog} ignoreTerm={false} />
            <Route exact path="/products" component={Catalog} />
            <Route exact path="/products/:id" component={ProductDetails} />

            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route exact path="/password/reset/:token" component={NewPassword} />
            <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

            <ProtectedRoute exact path="/me" component={Profile} />
            <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

            <ProtectedRoute exact path="/order/shipping" component={Shipping } />
            <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
            <ProtectedRoute exact path="/order/payment" component={Payment} />
            <ProtectedRoute exact path="/orders/me" component={ListOrders} isAdmin={false} />
            <ProtectedRoute exact path="/orders/:id" component={OrderDetails} />

            <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} isAdmin={true} />

            <ProtectedRoute exact path="/admin/orders" component={OrdersList} isAdmin={true} />
            <ProtectedRoute exact path="/admin/orders/:id" component={ProcessOrder} isAdmin={true} />

            <ProtectedRoute exact path="/admin/products" component={ProductsList} isAdmin={true} />
            <ProtectedRoute exact path="/admin/products/add" component={NewProduct} isAdmin={true} />
            <ProtectedRoute exact path="/admin/products/:id" component={UpdateProduct} isAdmin={true} />

            <ProtectedRoute exact path="/admin/users" component={UsersList} isAdmin={true} />
            <ProtectedRoute exact path="/admin/users/:id" component={UpdateUser} isAdmin={true} />
            <ProtectedRoute exact path="/admin/reviews" component={ProductReviews} isAdmin={true} /> 

            <Route exact path="*" component={PageNotFound} />
            
         </Switch>

         <Footer />
      </Router>
      
  

  )

}
