/**
 * Navbar
 * ============
 *
 * Creates a navbar where the production links are added as menu
 * items and all non-production types are aggregated into dropdown
 * menus based on the category name
 *
 * :Author: Nik Sumikawa
 * :Date: Dec 15, 2019
 *
 * Disclaminer : This routine was barrowed and potentially modified
 * from churrobeans.com. Please see license requirements at churrobeans.com/licenses
 */

import React from 'react';

import { Menu } from 'semantic-ui-react'

import NavComponentSelect from './components/NavComponentSelect'


// import this function when the user profile is included
import ProfileMenuItem from './components/MenuItems/Profile'
import isAdmin from './components/isAdmin'
import HomeMenuItem from './components/MenuItems/Home'
import DropdownMenu from './components/MenuItems/Dropdown'
import menuItems from './components/MenuItems/MenuItem'
import Href from './components/MenuItems/Href'



export default function NavbarSelect( props ){


  var routes = NavComponentSelect()

  // remove all components that should not have a navbar menu item
  var navComponents = routes.filter(row => (row.show !== false)&(row.loginMenu !== true))

  if( isAdmin(props) !== true ){
    navComponents = navComponents.filter(row => row.admin !== true)
  }


  // select all items that do not have a menu associated with them
  const flat_items = navComponents.filter(r => (r.href !== true)&((r.menu === undefined)|(r.menu === '')) )


  // select all items with a menu associated with them
  const dropdown = navComponents.filter(r => (r.href !== true)&((r.menu !== undefined)|(r.menu === '')) )
  const dropdown_items = [...new Set(dropdown.map(row => row.menu))]


  var navbar = menuItems(flat_items)

  for( var i=0; i < dropdown_items.length; i++ ){
    const menu = dropdown_items[i]
    const temp = dropdown.filter( row => row.menu === menu )
    navbar.push( DropdownMenu( menu, temp ) )
  }


  return(
    <Menu secondary >
      <HomeMenuItem {...props} />
      <Href
        {...props} 
        navComponents={navComponents} />

      {navbar}

      <ProfileMenuItem
        {...props}
        routes = {routes}
        />
    </Menu>
  )

}
