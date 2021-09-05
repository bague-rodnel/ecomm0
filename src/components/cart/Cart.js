import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions';

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector( state => state.cart );
  const { user } = useSelector( state => state.auth );
  
  const handleRemoveCartItem = (id) => {
    dispatch(removeItemFromCart(id, user));
  }

  const handleCheckout = () => {
    history.push("/login?redirect=order/shipping");
  }

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty, user));
  }

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty, user));
  }

  return (
    <Fragment>
      <MetaData title={'Your cart'} />
      <div className="container container-fluid">
      { cartItems.length === 0 ? <h2 className="mt-5">Your Cart is empty</h2> : (
        <Fragment>
          <h2 className="mt-5 h3 py-3 border-bottom">Your Cart: <b>{cartItems.length} item(s)</b></h2>
          
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-9">

              { cartItems.map( item => (
                <Fragment>

                  <div className="cart-item" key={ item.product }>
                    <div className="row align-items-center">
                      <div className="col-4 col-lg-2">
                        <img src={item.image} alt={item.name} height="90" width="115" />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                      </div>


                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p className="fw-bold h5 text-secondar  ">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0 d-flex">
                        <input type="number" className="count border-0 text-center form-control  d-inline" value={item.quantity} readOnly />
                        <div className="stockCounter d-inline d-flex flex-column">
                          <span onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                            className="btn theme--bg text-white p-1 m-0 rounded-0 border-bottom">
                            <i className="fa fa-arrow-up"></i>
                          </span>
                          <span onClick={() => decreaseQty(item.product, item.quantity)}
                            className="btn theme--bg text-white p-1 m-0 rounded-0 border-top">
                            <i className="fa fa-arrow-down"></i>
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p className="fw-bold h5 text-success">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0 h1" style={{ cursor: 'pointer'}}>
                        <i className="fa fa-times text-secondary"
                        onClick={() => handleRemoveCartItem(item.product)}></i>
                      </div>

                    </div>
                  </div>
                </Fragment>
              ))}
              
            </div>


            <div className="col-12 col-lg-3 my-4">
              <div className="shadow border rounded py-3 px-4">
                <h4 className="py-3 fw-bold text-gray-600 border-bottom">Order Summary</h4>
                <p className=" d-flex justify-content-between mt-2">
                  <label>No. of items:</label>
                  <span>
                    {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} 
                  </span>
                </p>
                <p className="d-flex justify-content-between">
                  <label>Est. total: </label>
                  <span>
                    ${cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}
                  </span>
                </p>

                <Link to={`order/shipping`}>
                <button className="btn btn-success w-100 mt-5">
                  Check out
                </button></Link>
              </div>
            </div>
          </div>
        </Fragment>
      )} 
      </div>
    </Fragment>
  )
}

export default Cart;