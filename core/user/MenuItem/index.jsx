
import React from 'react';

import { Menu} from 'semantic-ui-react'

import DropdownMenu from './DropdownMenu'



// returns the menu item when the user is currently logged in
export default function ProfileMenu( props ){

  return (
    <Menu.Menu
      key='navbar-menu-profile'
      position='right'
      >
      <Menu.Item key='navbar-profile'>
        <DropdownMenu {...props} />
      </Menu.Item>

    </Menu.Menu>
  )
}
