import React, { Fragment, useState, useEffect } from 'react';

import PocholoBanner from '../components/PocholoBanner';
import { Nav, Container, Row, Col } from 'react-bootstrap';

import MetaData from '../components/layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../actions/userActions';
import { REGISTER_USER_RESET } from '../constants/userConstants';


export default function Example({ history }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z');

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

    if (password.length < 8) {
      alert.error("Password must be at least 8 characters long.");
      return;
    }    
    
    if (password !== confirmPassword)  {
      alert.error("Make sure the passwords match!");
      return;
    }

    const formData = new FormData();
    formData.set('firstName', firstName);
    formData.set('lastName', lastName);
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
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 pt-5 sm:px-0">
              <h3 className="text-2xl font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-md text-gray-600">Use a permanent email address where you can receive mail.</p>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <PocholoBanner />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">

            <form onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-lg font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} 
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-lg font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </div>
          
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-lg font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                     <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="confirm-password" className="block text-lg font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-md sm:text-sm border-gray-500  rounded-md"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                      />
                    </div>
                  
                     {/*ADDING UPLOAD PICTURE*/}
                  

                    <div className="col-span-6 sm:col-span-4">
                     <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d={avatarPreview} />
                        </svg>
                      </span>                      
                      <label className="block text-sm font-medium text-gray-700">AVATAR</label>
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
                            <span>Upload an avatar</span>
                            <input
                               id="file-upload"
                               name="avatar"
                               type="file"
                               accept="images/*"
                               required
                               onChange={onChange}
                               className="sr-only"
                                />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG</p>
                      </div>
                    </div>
                  </div>

                    {/*<div className="col-span-6 sm:col-span-4">
                      <label htmlFor="avatar-upload" className="block text-lg font-medium text-gray-700">
                        Avatar
                      </label>
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
                            type="file"
                            name='avatar'
                            id="customFile"
                            autoComplete="email"
                            accept="images/*"
                            required
                            onChange={onChange}
                            className="custom-file-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                          />
                          <label className='custom-file-label' htmlFor='customFile'>
                              Choose Avatar
                          </label>
                        </div>
                      </div>
                      
                    </div>*/}
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="cus-login-register inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </Fragment>
  )
}
