import DataTable from 'react-data-table-component';

import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import Loader from '../components/layout/Loader';
import MetaData from '../components/layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../actions/orderActions';


const columns = [
    {
        name: '#',
        selector: row => row.index,
        sortable: true,
        hide: 'sm'
    },
    {
        name: 'Date purchased',
        selector: row => row.date
    },
    {
        name: 'Order ID',
        selector: row => row.id,
        hide: 'md'
    },
    {
        name: 'Amount',
        selector: row => row.amount
    },
    {
        name: 'Num of Items',
        selector: row => row.numOfItems,
        hide: 'sm'
    },
    {
        name: 'Status',
        selector: row => row.status
    },
    {
        name: 'Actions',
        selector: row => row.actions
    }

];





const NewListOrders = () =>{
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
        const data = [];

        let myOrders = orders.map( (order, index) => order );
        myOrders.reverse();
        myOrders && myOrders.forEach( (order, index) => {

          const date = order.purchasedOn && new Date(order.purchasedOn);
          const month = date && ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][date.getMonth()-1];
          const purchaseDate = month && `${month} ${date.getDate()}, ${date.getFullYear()}`;

          data.push({
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
        { loading ? <Loader /> : 
            <div className="mb-3">
                <DataTable
                    columns={columns}
                    data={setOrders()}
                />
            </div>
        }
        </Fragment>
    );
}

export default NewListOrders;