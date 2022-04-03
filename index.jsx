

import React, {useState} from 'react';
import { createBrowserHistory } from "history";

import { Router } from 'react-router-dom';

import RoutesSelect from './core/navigation/routes'
import NavbarSelect from './core/navigation/navbar'

import postUsage from './core/usage'
import checkJwt from "./core/usage/Jwt"
import {LoginPage} from "./core/usage/views/Login"

// create browser history to sync up with browser navigation
const hist = createBrowserHistory();


export default function Flint(props) {

  const [jwt, setJwt] = useState()


  const status = checkJwt(jwt, (val) => setJwt(val))

  // render the login page when the usage is enabled and the user
  // is not logged in
  if( status === false ) return <LoginPage setjwt={setJwt} />

  // send usage data to the backend when the page is rendered
  postUsage()

  return (
    <Router history={hist}>
      <div className="App">

        <NavbarSelect
          key={'navbar'}
          {...props}
          jwt={jwt}
          setjwt={setJwt}
          />

        <RoutesSelect
          key={'router'}
          {...props}
          jwt={jwt}
          setJwt={setJwt}
          />

      </div>
    </Router>
  );
}
