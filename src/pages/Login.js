import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { LockClosedIcon } from '@heroicons/react/solid';
import PocholoBanner from '../components/PocholoBanner';


import { Link } from 'react-router-dom';

import Loader from '../components/layout/Loader';
import MetaData from '../components/layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../actions/userActions';

export default function Login({ history, location }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading, user } = useSelector(state => state.auth);
  const params = new URLSearchParams(window.location.search);
  let redirect = params.get("redirect");

  useEffect(() => {
    if (isAuthenticated) {
      redirect = redirect || (user.isAdmin ? "/admin/dashboard" : "/");
      history.push(redirect);
    }
    
    if (error) {    
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, isAuthenticated, error, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handling submit ');
    dispatch(login(email, password));
  }

  return (
    <Container className="my-5">
      <Row className="align-items-center justify-content-center">
        <Col xs={{span: 12, order:2}} md={{span:3, order:1}}>
          <PocholoBanner />
        </Col>
        <Col xs={{span: 12, order:1}} md={{span:5, order:1}}>
          <div className="min-h-0 shadow-md flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
            
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div>
                    <p className=" block text-sm text-gray-900">
                      Not registered yet?
                    </p>
                    <Link to="/register" className="pl-0 text-sm font-medium text-blue-500 hover:text-blue-800">
                      Click Here
                    </Link>
                  </div>


                 <Link to="/password/forgot" className="pl-20 pr-0 text-sm font-medium text-blue-500 hover:text-blue-800">
                               
                    Forgot your password?
                                
                 </Link>

                </div>

                <div>
                  <button
                    type="submit"
                    className="cus-login-register group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
