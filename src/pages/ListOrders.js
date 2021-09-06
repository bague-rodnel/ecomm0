import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import Loader from '../components/layout/Loader';
import MetaData from '../components/layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../actions/orderActions';

const ListOrders = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector( state => state.myOrders );
  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert(error(error))
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error])

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: '#',
          field: 'index',
          sort: 'desc'
        },
        {
          label: 'Date purchased',
          field: 'date',
        },
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Num of Items',
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

      const date = order.purchasedOn && new Date(order.purchasedOn);
      const month = date && ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][date.getMonth()-1];
      const purchaseDate = month && `${month} ${date.getDate()}, ${date.getFullYear()}`;

      data.rows.push({
        index: index+1,
        date: purchaseDate,
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                  ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                  : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
        actions: <Link to={`/orders/${order._id}`} className="btn btn-outline-secondary">
                  <i className="fas fa-search-plus"></i>
                 </Link>
      })
    })

    return data;
  }

  return (
    <Fragment>
      <MetaData title={'My Orders'} />

      <div className="container container-fluid pb-5">
     <h3 className="my-5 text-xl font-medium leading-6 text-gray-900">My Orders</h3>

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
    </Fragment>
  )
}

export default ListOrders;
