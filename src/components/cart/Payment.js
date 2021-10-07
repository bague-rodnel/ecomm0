import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors, myOrders } from "../../actions/orderActions";
import { emptyCart } from "../../actions/cartActions";

import CheckoutSteps from "./CheckoutSteps";

import axios from "axios";
import store from "../../store";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Card = ({ history }) => {
  const swal = withReactContent(Swal);
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    email: user.email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // create payment intent on the server
      const token = await store.getState().auth.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          API_KEY: `${process.env.REACT_APP_API_KEY}`,
        },
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/payments/process`,
        paymentData,
        config
      );
      const clientSecret = res.data.client_secret;

      // confirm the payment on the client;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
        receipt_email: user.email,
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          dispatch(emptyCart(user));

          swal.fire({
            icon: "success",
            title: "Thank you for your purchase!",
            showConfirmButton: false,
            timer: 1500,
          });

          dispatch(myOrders());
          history.push("/orders/me");
        } else {
          alert.error("There is some issue while processing the payment");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <div className="container container-fluid">
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row">
        <form
          id="payment-form"
          onSubmit={handleSubmit}
          className="col-12 col-sm-8 col-md-6 col-lg-4"
        >
          <label
            className="mb-3 text-gray-400 bg-dark py-1"
            htmlFor="card-element"
          >
            Enter your card details
          </label>
          <CardElement id="card-element" />

          <button id="pay_btn" className="text-white btn">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Card);
