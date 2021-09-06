import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../components/layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../actions/userActions';


const NewPassword = ({ history, match }) => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success } = useSelector(state => state.forgotPassword);

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password updated successfully");
      history.push("/login");
    }

  }, [dispatch, alert, error, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  }

  return (
    <Fragment>
      <MetaData title={'New Password Reset'} />

      <div className="container container-fluid my-5">
        <div className="row wrapper justify-content-center">
          <div className="col-12 col-md-6">
            <form className="shadow-lg py-5 px-4 relative" 
              onSubmit={handleSubmit}>
              <h1 className="mb-3 h3">New Password</h1>

              <div className="form-group mb-3">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="confirm_password_field">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-content-end">
                <button
                  id="new_password_button"
                  type="submit"
                  className="btn btn-danger py-2">
                  Set Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default NewPassword
