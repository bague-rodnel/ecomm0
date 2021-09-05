import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Search from './Search';
import { logout } from '../../actions/userActions';

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth );
  const { cartItems } = useSelector(state => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    alert.success('Logged out successfully.');
  }

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/"><img src="./images/logo.png" /></Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: 'none' }} className="mr-2">
            <span id="cart" className="ml-3">Cart</span>
            <span id="cart_count">
              { ( !cartItems.length ) ? 0
                : cartItems.reduce((sum, item) => (sum + item.quantity), 0) }
            </span>
          </Link>

          { user ? (
            <div className="ml-2 dropdown d-inline">
              <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                <figure className="avatar avatar-nav">
                  <img 
                    src={user.avatar && user.avatar.url} 
                    className="rounded-circle"  
                  />
                </figure>
                <span className="profile-name">{ user.name && user.name.split(' ')[0] }</span>
              </Link>

              <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                { user && !user.isAdmin ? (
                  <Link className="dropdown-item" to="/orders/me">Orders</Link>
                ) : (
                  <Link className="dropdown-item" to="/admin/dashboard">Admin Dashboard</Link>
                )}

                <Link className="dropdown-item" to="/me">Profile</Link>
                <Link className="dropdown-item text-danger" to="/" onClick={handleLogout}>Logout</Link>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn" id="login_btn">Login</Link>
          )}
        </div>
      </nav>
    </Fragment>
  )
}

export default Header
