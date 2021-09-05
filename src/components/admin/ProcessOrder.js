import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrder, clearErrors, getOrderDetails } from '../../actions/orderActions';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

// import './admin.css';


const ProcessOrder = ({ match, history }) => {
  
  const [status, setStatus] = useState('');
  
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const { loading, order = {} } = useSelector( state => state.orderDetails );
  const { loading: isUpdating, isUpdated, error } = useSelector(state => state.order);
  const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus, purchasedOn } = order;

  const orderId = match.params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      history.push("/admin/orders");
      alert.success('Order updated successfully');
      dispatch({ type: UPDATE_ORDER_RESET });
    }

  }, [dispatch, alert, error, isUpdated, orderId]);

  const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
  const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

  let date = new Date(purchasedOn);
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][date.getMonth()-1];
  date = `${month} ${date.getDate()}, ${date.getFullYear()}`;

  const handleUpdate = (id) => {

    const formData = new FormData();
    formData.set('status', status);

    dispatch(updateOrder(id, formData));
  }


  return (
    <Fragment>
      <MetaData title={`Process Order # ${orderId}`} />

        <div className="row">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          
          <div className="col-12 col-md-10">
            { loading ? <Loader /> : ( 
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-10 p-5 my-5 shadow position-relative">

                  <h1 className="my-5">Order # {orderId}</h1>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p><b>Name:</b> {user && user.firstName + ' ' + user.lastName}</p>
                  <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                  <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                  <p><b>Amount:</b> ${totalPrice}</p>

                  <hr />
                  <h4 className="my-4">Purchased On</h4>
                  <p>{date}</p>    

                  <h4 className="my-4">Payment</h4>
                  <p className={isPaid ? "greenColor" : "redColor"} ><b>{ isPaid ? "PAID" : "NOT PAID" }</b></p>

                  <h4 className="my-4">Stripe ID</h4>
                  <p><b>{ paymentInfo && paymentInfo.id }</b></p>

                  <h4 className="my-4">Order Status:</h4>
                  <p className={orderStatus && String(orderStatus).includes('Delivered') ? "greenColor" : "redColor" } ><b>{orderStatus}</b></p>
						
						      <h4 className="my-4">Stripe ID</h4>
                  <p className="greenColor" ><b>stripe_3458349584985</b></p>


                  <h4 className="my-4">Order Items:</h4>

                  <hr />

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

                    
                  <h4 className="my-4">Status</h4>


                  <div className="input-group">
                    
                    <select class="form-select" aria-label="Default select example"
                      value={ status }
                      onChange={ (e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    
                    <button className="btn btn-warning" 
                      onClick={()=>handleUpdate(orderId)}
                      disabled={ isUpdating ? true : false }>
                      Update Status
                    </button>
                  </div>
                </div>
                
              </div>
            )}
          </div>
        </div>
    </Fragment>
  )
}

export default ProcessOrder;
