import React, { Fragment, useEffect } from 'react';

import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, clearErrors } from '../../actions/orderActions';
import { emptyCart } from '../../actions/cartActions';

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import store from '../../store';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const options = {
  style: {
    base: {
      fontSize: '16px'
    },
    invalid: {
      color: '#9e2146'
    }
  }
}

// const API = 'https://csp3-api-v1.herokuapp.com';
// const API = 'https://youthful-jones-4f9fef.netlify.app/';
// const API = 'http://localhost:4000';


const Payment = ({ history }) => {
  const swal = withReactContent(Swal);
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector( state => state.auth );
  const { cartItems, shippingInfo } = useSelector( state => state.cart );
  const { error } = useSelector( state => state.newOrder );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo
  }

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice ;
    order.taxPrice = orderInfo.taxPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    document.querySelector('#pay_btn').disabled = true;

    let res;
      
    try {
      const token = await store.getState().auth.token;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      // res = await axios.post(`${API}/api/payments/process`, paymentData, config);
      // res = await axios.post(`http://localhost:4000/api/payments/process`, paymentData, config);
      res = await axios.post(`/api/payments/process`, paymentData, config);



      const clientSecret = res.data.client_secret;

      if ( !stripe || !elements ) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email
          }
        }
      })

      if ( result.error ) {
        alert.error(result.error.message);
        document.querySelector('#pay_btn').disabled = false;

      } else {
        if (result.paymentIntent.status === 'succeeded') {

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }

          dispatch(createOrder(order));
          dispatch(emptyCart(user));

          swal.fire({
            icon: 'success',
            title: 'Thank you for your purchase!',
            showConfirmButton: false,
            timer: 1500
          })

          history.push('/orders/me');
        } else {
          alert.error('There is some issue while processing the payment');
        }
      }

    } catch (error) {
      document.querySelector('#pay_btn').disabled = false;
      alert.error(error.response.data.message);
    }
  }


  return (
    <Fragment>
      <MetaData title={'Payment Page'} />

      <div className="container container-fluid">
      <CheckoutSteps shipping confirmOrder payment /> 

      <div className="row justify-content-center">
        <div className="col-10 col-lg-7">
          <form className="shadow-lg px-5 py-5 my-4" 
            onSubmit={handleSubmit}>
            <h1 className="mb-4 h3">Card Info</h1>
            <div className="form-group mb-4">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>
      
            <div className="form-group mb-4">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>
      
            <div className="form-group mb-4">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>
    
          
            <button
              id="pay_btn"
              type="submit"
              className="btn btn-success fw-bold my-3 py-3 w-100"
            >
              Pay {` - ${orderInfo && orderInfo.totalPrice}`}
            </button>
  
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

export default Payment;
