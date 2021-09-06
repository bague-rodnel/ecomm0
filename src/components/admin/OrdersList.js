import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, clearErrors } from '../../actions/orderActions';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';



const OrdersList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector( state => state.allOrders );
  const { isDeleted } = useSelector( state => state.order );

  useEffect(() => {
    dispatch(getAllOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      history.push('/admin/orders');
      alert.success('Order deleted successfully');
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, history])

  const handleDelete = (id) => {
    const confirmed = window.confirm('Delete order?');
    if (confirmed) {
      dispatch(deleteOrder(id));
    }
  }

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: '#',
          field: 'index',
        },
        {
          label: 'Date Purchased',
          field: 'date',
          sort: 'desc'
        },
        { 
          label: 'Order ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'No of Items',
          field: 'numOfItems',
          sort: 'asc'
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions'
        }
      ],
      rows: []
    }

    orders && orders.forEach( (order, index) => {

      // let date = new Date(order.purchasedOn);
      // date = `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`;
      const date = new Date(order.purchasedOn);
      const month = date && ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][date.getMonth()-1];
      const purchaseDate = month && `${month} ${date.getDate()}, ${date.getFullYear()}`;

      data.rows.push({
        index: index,
        date: purchaseDate,
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                  ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                  : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
        actions:  <Fragment>
                  <Link to={`/admin/orders/${order._id}`} className="btn text-dark py-1 px-2">
                    <i className="fa fa-eye"></i>
                  </Link>
                  <button className="btn text-danger py-1 px-2 ml-2" onClick={() => handleDelete(order._id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                  </Fragment> 
      }) 
    })

    return data;
  }

  return (
    <Fragment>
      <MetaData title={'All Orders'} />

      <div className="row pb-5">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        
        <div className="col-12 col-md-10">
          <h1 className="my-5">All Orders</h1>

          { loading ? <Loader /> : (
            <MDBDataTable 
              data={setOrders()}
              className="px-3"
              bordered
              striped
              hover
            />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default OrdersList;