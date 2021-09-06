import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from '../components/layout/Loader';
import MetaData from '../components/layout/MetaData';
import NoAvatar from '../images/no-img-avatar.png';
const Profile = () => {

  const { user, loading } = useSelector(state => state.auth);

  return (
    <Fragment>
      { loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'User Profile'} />

          <div className="container container-fluid pb-5">
            <h2 className="mt-5 ml-5">My Profile</h2>
            <div className="row justify-content-evenly mt-5 text-center">

              <div className="col-12 col-md-4">
                <figure className='avatar avatar-profile mx-auto w-50'>
                  <img className="rounded-circle img-fluid" 
                  src={user.avatar.url && user.avatar.url !== 'x' || NoAvatar} 
                  alt={user.name} />
                </figure>
                
              </div>
      
              <div className="col-12 col-md-4 text-center text-md-start align-self-center mt-5 mt-md-0">

                <p>Full Name: { `${user.firstName} ${user.lastName}`}</p>
                <p>Email Address: { user.email }</p>
                <p>Joined: { String(user.createdAt).substring(0, 10) }</p>


                <Link to="/me/update" className="text-decoration-underline">
                  Edit Profile
                </Link>
              </div>

              <div className="col-md-4">
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
