import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  
  const { isAuthenticated, loading, user } = useSelector(state => state.auth);
  
  return (
    <Fragment>
      { 
        loading === false && user && (
        <Route
          { ...rest }
          render={props => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />
            }

            if (isAdmin === true && !user.isAdmin) {
              return <Redirect to="/" />
            }

            if (isAdmin === false && user.isAdmin) {
              return <Redirect to="/" />
            }

            return <Component { ...props } />
          }}
        /> 
      )}
    </Fragment>
  )
}

export default ProtectedRoute
