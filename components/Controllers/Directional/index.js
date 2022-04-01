/**
 * Directional Controller
 * @description used to move objects in an x/y coordinate system
 * @author Nik Sumikawa
 * @date Jan 4, 2020
 */


import React from 'react';

import {Button} from 'semantic-ui-react'

export default function DirectionalController( props ){

  var callback = (val) => console.log('callback not provided', val)
  if( props.callback !== undefined ) callback = (val) => props.callback(val)

  return (
    <div
      style={{
        width: '144px',
        height: '144px'
      }}>

      <div
        style={{
          position:'absolute',
          top: '36px',
          left: '36px',
          width: '100px',
          height: '100px',
          // background: 'red',
          borderWidth: '1',
          borderStyle:'solid',
          borderColor: '#B0B0B0',
          borderRadius: '50px'
        }}/>

      <Button
        style={{
          position:'absolute',
          top: '18px',
          left: '68px',
        }}
        icon='arrow up'
        onClick={() => callback('up')}
        circular/>

      <Button
        style={{
          position:'absolute',
          top: '68px',
          left: '18px',
        }}
        icon='arrow left'
        onClick={() => callback('left')}
        circular/>

      <Button
        style={{
          position:'absolute',
          top: '118px',
          left: '68px',
        }}
        icon='arrow down'
        onClick={() => callback('down')}
        circular/>

      <Button
        style={{
          position:'absolute',
          top: '68px',
          left: '118px',
        }}
        icon='arrow right'
        onClick={() => callback('right')}
        circular/>
    </div>
  )

}
