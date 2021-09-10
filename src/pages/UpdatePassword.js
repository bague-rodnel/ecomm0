import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../components/layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../actions/userActions';
import { logout } from '../actions/userActions';

import { UPDATE_PASSWORD_RESET } from '../constants/userConstants';

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector(state => state.user);

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated successfully. Please log back in.");

      dispatch({
        type: UPDATE_PASSWORD_RESET
      })

      
      history.push("/");
      dispatch(logout());
    }

  }, [dispatch, alert, error, history, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('oldPassword', oldPassword);
    formData.set('newPassword', newPassword);

    dispatch(updatePassword(formData));
  }

  return (
    <Fragment>

      <div className="container container-fluid">
      <div className="row wrapper justify-content-center">
        <div className="col-10 col-lg-5 my-5">
          <form className="shadow-lg p-5" onSubmit={handleSubmit}>
            <h1 className="mt-2 mb-5 h3">Update Password</h1>
            <div className="form-group mb-3">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={ oldPassword }
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={ newPassword }
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn update-btn btn-block btn-warning mt-4 mb-3" 
              disabled={ loading ? true : false }>Update Password</button>
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

export default UpdatePassword
