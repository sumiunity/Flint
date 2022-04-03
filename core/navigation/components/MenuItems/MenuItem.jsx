
import React from 'react';

import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import pathname from '../../components/Path'
import postUsage from '../../../usage'


// returns a list of menu items belonging to a specified category
export default function menuItems(props, items ){

  var menu_items = []

  // create a dropdown menu item for each item in the category
  for( var i=0; i < items.length; i++ ){

    // forced to create a copy to fix string entered into updateUsage
    const path =  pathname(props, items[i].path)

    menu_items.push(
      <Menu.Item
        key={`menuitem-${path}`}
        as={ Link }
        to={path}
        name={items[i].name}
        onClick={() => postUsage({'path': path})}
      />
    )
  }

  return menu_items

}
