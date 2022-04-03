/**
Sidebar
==================

Renders a sidebar based on the configuration file

@author Nik Sumikawa
@date Nov 23, 2020
*/

import React from 'react';

import {Menu, Dropdown} from 'semantic-ui-react'

// import jsonArray from '../../../jsonArray/jsonArray'




// renders a sidebar given an array of category names
export default function Sidebar( props ){

  var menuItems = flat_categories(props )
  menuItems = menuItems.concat( sub_categories(props) )

  return (
    <Menu pointing secondary vertical>
      {menuItems}
    </Menu>
  )

}

/**
 * renders a menu item without a dropdown since these do not
 * have subcategories
 * @param  {Object} props               Object containing the components to render
 * @return {None}
 */
function flat_categories( props ){


  const config = props.config.filter(r => r.subcategory === undefined )

  // filter the undefined values from unique
  var values = config.map(row => row['category'])

  // remove duplicates by forcing to a set
  var categories = [...new Set(values)]

  // create menu items for each category
  var menuItems = []
  for( var i=0; i < categories.length; i++ ){
    const cat = categories[i]

    menuItems.push(
      <Menu.Item
        key={`menu-${cat}`}
        name={cat}
        active={props.category === cat}
        onClick={() => {
          props.setCategory(cat)
          props.setSubCategory(undefined)
        }}
      />
    )
  }

  return menuItems
}


/**
 * renders a menu item with a dropdown for each subcategory
 * @param  {Object} props               Object containing the components to render
 * @return {None}
 */
function sub_categories( props ){

  // filter out all undefined subcategories
  const config = props.config.filter(r => r.subcategory !== undefined )

  // group the components based on the category name
  var categories = {}
  for( let i=0; i < config.length; i++ ){
    var cat = config[i]['category']
    if( Object.keys(categories).includes(cat) ){
      categories[cat].push(config[i])
    }else{
      categories[cat] = [config[i]]
    }
  }

  // create a dropdown menu for each category with entries
  // corresponding to the subcategory names
  var menuItems = []
  const keys = Object.keys(categories)
  for( let i=0; i < keys.length; i++ ){

    const cat = keys[i]

    // create dropdwon entries for the sub categories
    var subMenuItems = []
    for( var j=0; j < categories[cat].length; j++ ){
      const subcat = categories[cat][j]['subcategory']

      subMenuItems.push(
        <Dropdown.Item
          key={`dropdown-${cat}-${subcat}`}
          onClick={() => {
            props.setCategory(cat)
            props.setSubCategory(subcat)
          }}
          >
          {subcat}
        </Dropdown.Item>
      )
    }

    // create the root dropdwon with the category name
    menuItems.push(
      <Dropdown
        key={`dropdown-${cat}`}
        item
        text={cat}>
        <Dropdown.Menu>
          {subMenuItems}
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  return menuItems
}
