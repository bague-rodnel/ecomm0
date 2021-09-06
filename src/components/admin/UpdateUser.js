import React, { Fragment, useState, useEffect } from 'react';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser, clearErrors } from '../../actions/userActions';
import { UPDATE_USER_RESET } from '../../constants/userConstants';



const UpdateUser = ({ match, history }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector(state => state.user);
  const { loading, user } = useSelector(state => state.userDetails);

  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRole(user.isAdmin ? 'admin' : 'user');
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('User updated successfully');

      history.push('/admin/users');

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('firstName', firstName);
    formData.set('lastName', lastName);
    formData.set('email', email);
    formData.set('isAdmin', (role === 'admin') ? true : false );

    dispatch(updateUser(userId, formData));
  }

  return (
    <Fragment>
      <MetaData title={`Update User # ${userId}`} />

        <div className="row pb-5">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          
          <div className="col-12 col-md-10">
            { loading ? <Loader /> : ( 
              <div className="row wrapper justify-content-center">
                <div className="col-10 col-lg-6 my-5">
                  <form className="shadow-lg px-5 py-4">
                    <h1 className="mt-2 mb-4 h3">Update User</h1>

                    <div className="form-group mb-3">
                      <label htmlFor="name_field">First Name</label>
                      <input 
                        type="text" 
                        id="name_field" 
                        className="form-control"
                        name='firstName'
                        value={ firstName }
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="name_field">Last Name</label>
                      <input 
                        type="text" 
                        id="name_field" 
                        className="form-control"
                        name='lastName'
                        value={ lastName }
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="email_field">Email</label>
                      <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name='email'
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="role_field">Role</label>

                      <select
                        id="role_field"
                        className="form-control"
                        name='role'
                        value={ role }
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </div>

                    <button type="submit" 
                      className="btn text-white theme--bg mt-4 mb-3" 
                      onClick={handleSubmit}>Update</button>
                  </form>
                </div>
            </div>
            )}
          </div>
        </div>
    </Fragment>
  )
}

export default UpdateUser
