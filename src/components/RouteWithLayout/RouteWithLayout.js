import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import auth from '../../Auth'

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => {
        let isAuthenticated = auth.isAuthenticated();

        console.log(isAuthenticated)

        if(isAuthenticated){
          return (
            <Layout>
              <Component {...matchProps} />
            </Layout>
          )
        } else {
          return (
            <Redirect to={
              {
                pathname: '/sign-in',
                state: {
                  from: matchProps.location
                }
              }
            } />
          )
        }
      }}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
