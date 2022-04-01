/**
 * Menu Components
 * =================
 *
 * wraps all menu components into a single class to make
 * it easier to access these components during development
 *
 * @author Nik Sumikawa
 * @date Nov 5, 2020
 */


import React from 'react';

import {
  Menu as SemanticMenu,
  Segment,
} from 'semantic-ui-react'

import MenuComponents from '../components/MenuComponents'
// import SearchMenu from './Search'
// import DropdownMenu from './Dropdown'



export class Menu{

  get MenuTop(){ return MenuTop }


  get SegmentBottom(){ return SegmentBottom }


  get MenuComponents(){ return new MenuComponents() }
  // get Search(value){ return SearchMenu }
  // get Dropdown( value ){ return DropdownMenu }

  }




function MenuTop( props ){

  return(
    <SemanticMenu attached='top'>
      {props.children}
    </SemanticMenu>
  )
}


// function MenuLeft( props ){
//
//   return(
//     <SemanticMenu vertical attached='left'>
//       {props.children}
//     </SemanticMenu>
//   )
// }



function SegmentBottom( props ){

  return(
    <Segment
      {...props}
      attached='bottom'>
      {props.children}
    </Segment>
  )
}

// function SegmentRight( props ){
//
//   return(
//     <Segment attached='right'>
//       {props.children}
//     </Segment>
//   )
// }

export default Menu
