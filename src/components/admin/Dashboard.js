import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productActions';
import { getAllOrders } from '../../actions/orderActions';
import { getAllUsers } from '../../actions/userActions';




const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.allProducts);
  const { users } = useSelector(state => state.allUsers);
  const { orders, totalAmount, loading } = useSelector(state => state.allOrders);

  let outOfStock = 0;
  products && products.forEach(product => {
    if (product.stock === 0) {
      outOfStock++;
    }
  })

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers()); 
  }, [dispatch])
  
  return (
    <Fragment>
      <MetaData title={'Admin Dashboard'} />

      <div className="row pb-5">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-5 h4 text-secondary">Dashboard</h1>

          { loading ? <Loader /> : (
            <Fragment>
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-4">
                  <div className="card text-success o-hidden h-100 shadow">
                    <div className="card-body">
                      <div className="text-center h3 py-3">Total Sales<br /> 
                        <b>${ totalAmount && totalAmount.toFixed(2) }</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-dark o-hidden h-100 shadow">
                    <div className="card-body">
                      <div className="text-center card-font-size">Products<br /> 
                        <b>{ products && products.length }</b></div>
                    </div>
                    <Link className="card-footer text-dark clearfix small z-1" to="/admin/products">
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>


                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-dark b o-hidden h-100 shadow">
                    <div className="card-body">
                      <div className="text-center card-font-size">Orders<br /> 
                        <b>{ orders && orders.length }</b>
                      </div>
                    </div>
                    <Link className="card-footer text-dark clearfix small z-1" to="/admin/orders">
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>


                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-dark o-hidden h-100 shadow">
                    <div className="card-body">
                      <div className="text-center card-font-size">Users<br /> 
                        <b>{ users && users.length }</b></div>
                    </div>
                    <Link className="card-footer text-dark clearfix small z-1" to="/admin/users">
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>


                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-dark o-hidden h-100 shadow">
                    <div className="card-body">
                      <div className="text-center card-font-size">Out of Stock<br /> 
                        <b>{ outOfStock }</b>
                      </div>
                    </div>
                    <Link className="card-footer text-dark clearfix small z-1" to="/admin/products">
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard;
