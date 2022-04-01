/**
 * Routes
 * ============
 *
 * Routine that returns the routes based on the specified type.
 * Extend the switch statement when adding a new website
 *
 * :Author: Nik Sumikawa
 * :Date: Dec 16, 2019
 */

import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import NavComponentSelect from './components/NavComponentSelect'
import pathname from './components/Path'



export default function RoutesSelect( props ){

  var routes = []

  var navComponents = NavComponentSelect()

  // create a route based on the authorization type of the component
  // and the authorization level of the user
  for( var i=0; i < navComponents.length; i++ ){
    const navComp = navComponents[i]


    switch( navComp.auth ){
      case 'public' :
        routes.push( PublicRoute(navComp.component, props, navComp.path) )
        continue

      case 'private' :
        routes.push( PrivateRoute(navComp.component, props, navComp.path, props.auth) )
        continue

      // Default to a public route
      default :
        routes.push( PublicRoute(navComp.component,props,  navComp.path) )
        continue
    }
  }

  return routes;
}


// Public routes are available to everyone. No permissions are
// used to determine accessability
const PublicRoute = (Component, props, path) => (

  <Route
    key={pathname(path )}
    exact
    path={pathname(path )}
    render = {obj =>
      <Component {...Object.assign(obj, props)} />
    }
  />
);

// Private routes allow access to only authorized users.
const PrivateRoute = (Component, props, path, auth) => (
  <Route
    key={pathname(path )}
    exact
    path={pathname(path )}
    render = {obj =>
      auth.isAuthenticated === true ? (
        <Component {...Object.assign(obj, props)} />
      ) : (
        <Redirect to="/loggedOutHome" />
      )
    }
  />
);
