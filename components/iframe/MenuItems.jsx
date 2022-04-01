/**
 * Resource Table
 * ====================
 *
 * Render additional resources inside a tab controlled window
 *
 * :Author: Nik Sumikawa
 * :Date: June 29, 2020
 *
 * :update: July, 10, 2020
 * Added IFrame component to render the resources in place
 */

import React from 'react';

import {Menu, Segment, Button } from 'semantic-ui-react'


export default function MenuItems( props ){


  var menu = []

  // populate the menu and segment buffers with the
  // contents for all pages we wish to render.
  for( var i=0; i < props.config.length; i++ ){

    const config = props.config[i]

    // populate the menu with a tab for the resource
    menu.push(
      <Menu.Item
        key={`MenuItem-${config.name}`}
        active={props.activeItem === config.name}
        onClick={() => props.setActiveItem(config.name)}
      >
        <HeaderComponent
          {...props}
          name={config.name}
          />
      </Menu.Item>
    )
  }

  return (

      <Menu attached='top' tabular>
        {menu}
      </Menu>

  )
}



function HeaderComponent( props ){

  // Do not add an enlarge button when the tab is not selected
  if( props.activeItem !== props.name ) return <div>{props.name}</div>

  return(

    <Segment.Group
      key={`Header-SeggyGroup-${props.name}`}
      raised={false}
      compact
      horizontal
      style={{
        padding:0,
        margin:0,
        boxShadow: 'none',
        border: '0',
        backgroundColor:'transparent'}}>

      <Segment
        key={`Header-Title-${props.name}`}
        basic
        textAlign='center'
        style={{
          padding:0,
          margin:0,
          backgroundColor:'transparent',
          border: '0'}} >
        {props.name}
      </Segment>

      <Segment
        key={`Header-Filter-${props.name}`}
        basic
        style={{
          marginTop:'-5px',
          marginLeft:'10px',
          padding: 0,
          maxWidth: '20px',
          backgroundColor:'transparent',
          border: '0'}}
        textAlign='right'>

        <Button
          circular
          basic
          onClick={()=> props.setFullScreen(props.name)}
          color='red'
          icon='television'
          size='mini'/>

      </Segment>
    </Segment.Group>

  )
}
