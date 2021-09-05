import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../components/layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, loadUser, clearErrors } from '../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../constants/userConstants';

const UpdateProfile = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { error, isUpdated, loading } = useSelector(state => state.user);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadUser());

      history.push("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET
      })
    }

  }, [dispatch, alert, error, history, isUpdated, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('firstName', firstName);
    formData.set('lastName', lastName);
    formData.set('email', email);
    formData.set('avatar', avatar);

    dispatch(updateProfile(formData));
  }

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      // 0 - created, 1 - processing?, 2 - done
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    } 

    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />

      <div className="container container-fluid my-5">
      <div className="row wrapper  d-flex justify-content-center">
        <div className="col-10 col-lg-6">
          <form className="shadow-lg py-5 px-5 " onSubmit={handleSubmit} encType='multipart/form-data'>
          <h1 className="mt-2 mb-4 h4 text-center">Update Profile</h1>

            <div className="form-group mb-3">
              <label htmlFor="name_field">First Name</label>
              <input 
                type="text" 
                id="name_field" 
                className="form-control"
                name='firstName'
                value={ firstName }
                onChange={ (e) => setFirstName(e.target.value) }
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
                onChange={ (e) => setLastName(e.target.value) }
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
                onChange={ (e) => setEmail(e.target.value) }
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center justify-content-between'>
                <div>
                  <figure className='avatar mr-3 item-rtl'>
                    <img
                      src={ avatarPreview }
                      className='rounded-circle'
                      alt='Avatar Preview'
                      width="100"
                      height="100"
                    />
                  </figure>
                </div>
                <div className='custom-file'>
                  <input
                    type='file'
                    name='avatar'
                    className='custom-file-input'
                    id='customFile'
                    accept='image/*'
                    onChange={onChange}
                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" 
              className="btn update-btn btn-block mt-4 mb-3 btn btn-success right-0"
              disabled={ loading ? true : false }>Update</button>
          </form>
        </div>
      </div>
      </div>
    </Fragment>
    
  )
}

export default UpdateProfile
