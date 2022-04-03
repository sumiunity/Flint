
import React from 'react';

import { Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

// import this function when the user profile is included
import {setJwt} from "../../../../usage/Jwt"
import postUsage from '../../../../usage'
import pathname from '../../Path'





// Navbar menu item that
export default function DropdownMenu( props ){

  if( props.projConfig.authentication.enable !== true ) return null

  var Components = []
  if( props.routes !== undefined ){
    const routes = props.routes.filter(r => r.loginMenu === true )

    for( var i=0; i < routes.length; i ++ ){
      Components.push(
        <Dropdown.Item
            key={routes[i].name}
            as={ Link }
            to={ pathname(props, routes[i].path)}
          >
          {routes[i].name}
        </Dropdown.Item>
      )
    }
  }



  return (
    <Dropdown
      key={`navbar-Login`}
      item
      icon={'user circle'}
      text={props.jwt.username}
      simple>
      <Dropdown.Menu>

        {Components}

        <Dropdown.Divider />

        <Dropdown.Item
            key={`dropdown-Login`}
            as={ Link }
            to={ pathname(props, '/UserProfile')}
            onClick={() => postUsage({'path': '/UserProfile'})}
          >
          Profile
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item
          key={'Logout dropdown item'}
          onClick={()=> logout( props.setjwt ) }
        >
          Logout
        </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  )

}


function logout( setjwt ){
  if( setjwt !== undefined ) setjwt( false )
  setJwt(undefined)
}
