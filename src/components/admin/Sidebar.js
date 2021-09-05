import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './admin.css';

const Sidebar = () => {
  return (
    <div className="px-3 py-5">
      <nav id="#sidebar">
        <ul>
          <li className="mb-2">
              <Link to="/admin/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
          </li>
  
          <li className="mb-3">
            <div className="pb-2 border-bottom">
              <i className="fas fa-shapes"></i> Products
            </div>
            <ul className="ml-3 my-2" id="productSubmenu">
              <li className="mb-1">
                <Link to="/admin/products"><i className="fas fa-clipboard-list"></i> All</Link>
              </li>

              <li className="mb-1">
                <Link to="/admin/products/add"><i className="fas fa-plus"></i> Create</Link>
              </li>
            </ul>
          </li>

          <li className="mb-2">
            <Link to="/admin/orders"><i className="fas fa-shopping-basket"></i> Orders</Link>
          </li>

          <li className="mb-2">
            <Link to="/admin/users"><i className="fas fa-users"></i> Users</Link>
          </li>

          <li>
            <Link to="/admin/reviews"><i className="fas fa-star"></i> Reviews</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar;
