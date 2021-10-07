import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useSelector } from "react-redux";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // calculate order prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = 0;

  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const proceedToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/order/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />

      <div className="container container-fluid">
        <CheckoutSteps shipping confirmOrder />

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-3 mt-lg-5 order-confirm">
            <h1 className="h3 text-center">Confirm Your Order</h1>

            <section className="py-3 px-2 border-top text-gray-700">
              <h4 className="mb-3">Shipping Info</h4>
              <div className="flex">
                <span className="flex-grow-1 fw-bold">Name:</span>
                <span className="flex-grow-1 text-right">
                  {user.firstName + " " + user.lastName}
                </span>
              </div>
              <div className="flex">
                <span className="flex-grow-1 fw-bold">Phone:</span>
                <span className="flex-grow-1 text-right">
                  {shippingInfo.phoneNo}
                </span>
              </div>
              <div className="flex">
                <span className="flex-grow-1 fw-bold">Address:</span>
                <span className="flex-grow-1 text-right">{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</span>
              </div>
            </section>

            <section className="py-3 px-2 border-top">
              <h4 className="mt-4 mb-3">Your Cart Items</h4>

              {cartItems.map((item) => (
                <Fragment>
                  <div className="text-gray-600">
                    <div className="cart-item my-2" key={item.product}>
                      <div className="row">
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-4 col-lg-6 small">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-4 mt-4 mt-lg-0 text-right">
                          <div>${item.price}</div>
                          <div>x {item.quantity}</div>
                          <div className="fw-bold">
                            ${(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </section>
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div className="shadow py-4 px-4 my-lg-5">
              <h4 className="py-3">Order Summary</h4>
              <hr />
              <p className="my-2">
                Subtotal:{" "}
                <span className="order-summary-values">${itemsPrice}</span>
              </p>
              <p className="my-2">
                Shipping:{" "}
                <span className="order-summary-values">${shippingPrice}</span>
              </p>
              <p className="my-2">
                Tax: <span className="order-summary-values">${taxPrice}</span>
              </p>

              <hr />

              <p className="my-3">
                Total:{" "}
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />
              <button
                className="btn btn-success w-100"
                onClick={proceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
