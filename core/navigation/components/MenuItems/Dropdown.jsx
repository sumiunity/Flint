import React from 'react';


import { Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import pathname from '../../components/Path'
import postUsage from '../../../usage'

// returns a dropdown menu for all items belonging to the category
export default function DropdownMenu( menu_name, items ){

  var dropdown_items = []

  // create a dropdown menu item for each item in the category
  for( var i=0; i < items.length; i++ ){

    // forced to create a copy to fix string entered into updateUsage
    const path =  pathname(items[i].path)

    // add a divider but not an item in the dropdown menu. The divider
    // will be added based on the chronogical position in array
    if( items[i].name === 'divider'  ){
      dropdown_items.push(
        <Dropdown.Divider key={`${path}${i}-divider`}
          />)
      continue
    }

    dropdown_items.push(
      <Dropdown.Item
          key={`dropdown-${path}`}
          as={ Link }
          to={path}
          onClick={() => postUsage({'path': path})}
        >
        {items[i].name}
      </Dropdown.Item>
    )
  }


  return(
    <Dropdown
      key={`dropdown-${menu_name}`}
      item
      text={menu_name}
      simple>
      <Dropdown.Menu>
        {dropdown_items}
      </Dropdown.Menu>
    </Dropdown>
  )

}
