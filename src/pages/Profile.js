import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from '../components/layout/Loader';
import MetaData from '../components/layout/MetaData';

const Profile = () => {

  const { user, loading } = useSelector(state => state.auth);

  return (
    <Fragment>
      { loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'User Profile'} />

          <div className="container container-fluid">
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
              <div className="col-12 col-md-3 d-flex flex-column">
                <figure className='avatar avatar-profile mx-auto'>
                  <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                </figure>
                <Link to="/me/update" id="edit_profile" className="btn btn-outline btn-block my-5">
                  Edit Profile
                </Link>
              </div>
      
              <div className="profile col-12 col-md-5 text-center text-md-start">
                <h4 className="my-1">Full Name</h4>
                <p className="ml-3">{ `${user.firstName} ${user.lastName}`}</p>
    
                <h4 className="my-1">Email Address</h4>
                <p className="ml-3">{ user.email }</p>

                <h4 className="my-1">Joined</h4>
                <p className="ml-3">{ String(user.createdAt).substring(0, 10) }</p>

                { !user.isAdmin && (
                  <Link to="/orders/me" className="btn btn-success btn-block mt-5">
                    My Orders
                  </Link>
                )}

                <Link to="/password/update" className="btn btn-outline border btn-block mt-5 mx-2">
                  Change Password
                </Link>
              </div>
          </div>
        </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
