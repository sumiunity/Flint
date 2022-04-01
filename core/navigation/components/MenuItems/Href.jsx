
import React from 'react';

import { Menu } from 'semantic-ui-react'

// hyperlink to an external website
export default function Href( props ){

  var menu_items = []

  // select all items that do not have a menu associated with them
  const href = props.navComponents.filter(row => (row.href === true) )


  // create a dropdown menu item for each item in the category
  for( var i=0; i < href.length; i++ ){

    menu_items.push(
      <Menu.Item
        key={`href-${href[i].name}}`}
        href={ href[i].path }
        name={href[i].name}
        />
    )
  }

  return menu_items
}
