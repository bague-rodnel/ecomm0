import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../actions/userActions';
import { REGISTER_USER_RESET } from '../../constants/userConstants';

const Register = ({ history }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, success, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (success) {
      history.push('/login');
      alert.success('Successfully registered user');
      dispatch({ type: REGISTER_USER_RESET });
    }
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, isAuthenticated, error, history, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword)  {
      alert.error("Make sure the passwords match!");
      return;
    }

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);

    dispatch(register(formData));
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
      <MetaData title={'Register User'} />
      <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input 
                type="name" 
                id="name_field" 
                className="form-control"
                name="name"
                required
                value={name}s
                // onChange={onChange} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                required
                value={email}
                // onChange={onChange}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                required
                value={password}
                // onChange={onChange}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password2_field">Confirm Password</label>
              <input
                type="password"
                id="password2_field"
                className="form-control"
                name="confirmPassword"
                required
                value={confirmPassword}
                // onChange={onChange}
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>

            {/*ADDING UPLOAD PICTURE*/}
            <div>
                <label className="block text-sm font-medium text-gray-700">Avatar</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>

             {/*<div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                <div>
                  <figure className='avatar mr-3 item-rtl'>
                    <img
                      src={avatarPreview}
                      className='rounded-circle'
                      alt='Avatar Preview'
                    />
                  </figure>
                </div>
                <div className='custom-file'>
                  <input
                    type='file'
                    name='avatar'
                    className='custom-file-input'
                    id='customFile'
                    accept="images/*"
                    required
                    onChange={onChange}
                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                      Choose Avatar
                  </label>
                </div>
              </div>
            </div>*/}

           
    
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={ loading ? true : false } 
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

export default Register;
