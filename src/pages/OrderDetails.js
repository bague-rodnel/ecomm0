import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../components/layout/Loader';
import MetaData from '../components/layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, clearErrors } from '../actions/orderActions';

const OrderDetails = ({ match }) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order = {} } = useSelector( state => state.orderDetails );
  const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus, purchasedOn } = order;
  const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  
  const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
  const date = purchasedOn && new Date(purchasedOn);
  const month = date && ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][date.getMonth()-1];
  const purchaseDate = month && `${month} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <Fragment>

      { loading ? <Loader /> : (
        <Fragment>
          <div className="row d-flex justify-content-between pb-5">
            <div className="col-12 col-lg-8 mt-5 order-details mx-auto">

              <section className="border-b pb-4">
                <h1 className="my-5 h2">Order # {order._id}</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p><b>Name:</b> { user && `${user.lastName}, ${user.firstName}` }</p>
                <p><b>Phone:</b> { shippingInfo && shippingInfo.phoneNo }</p>
                <p className="mb-4"><b>Address:</b> { shippingDetails }</p>
                <p><b>Amount:</b> ${ totalPrice }</p>
              </section>

              <section className="border-b pb-4">
                <h4 className="my-4">Purchased On</h4>
                <p className="my-4">{purchaseDate}</p>
              
                <h4 className="my-4">Payment</h4>
                <p className={isPaid ? "text-success" : "text-warning"} ><strong>{ isPaid ? "PAID" : "NOT PAID" }</strong></p>

                <h4 className="my-4">Order Status:</h4>
                <p className={orderStatus && String(orderStatus).includes('Delivered') ? "text-success" : "text-warning" } ><strong>{orderStatus}</strong></p>
              </section>

              <h4 className="my-4">Order Items:</h4>

              <section>
                { orderItems && orderItems.map(item => (
                  <div className="row my-5">
                    <div className="col-4 col-lg-2">
                      <img src={ item.image } alt={ item.name } height="45" width="65" />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to= {`/products/${item.product}`}>{item.name}</Link>
                    </div>


                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>${ item.price }</p>
                    </div> 

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{ item.quantity } Piece(s)</p>
                    </div>
                  </div>
                ))}
                
              </section>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default OrderDetails
