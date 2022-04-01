/**
 * Dropdown Menu Component
 * ========================
 *
 * Dropdown menu component with callback
 * functions used to update parent nodes
 *
 * @author Nik Sumikawa
 * @date Nov 4, 2020
 */



import React from 'react';

import { Dropdown, Form } from 'semantic-ui-react'

/**
 * Standarized dropdown menu contained within a menu component.
 * @param       {function} props.callback callback function executed when the button or enter is pressed
 * @param       {string} props.placeholder default string entered in the search box (i.e. placeholder)
 * @param       {Array} props.values Array of values to be rendered in the dropdown menu
 * @constructor
 */
export function DropdownMenu( props ){


  var callback = (value) => console.log( 'not implemented', value)
  if( props.callback !== undefined ) callback = (value) => props.callback(value)
  if( props.onChange !== undefined ) callback = (value) => props.onChange(value)

  var placeholder = 'Values...'
  if(props.placeholder !== undefined ) placeholder = props.placeholder

  var style = {padding: '5px', minWidth:'100px'}
  if( props.style !== undefined ) style = {...style, ...props.style}

  // var icon = undefined
  // if( props.icon !== undefined ) icon = props.icon
  //
  const Component = (
    <Dropdown
      style={{border: 0, minWidth:'100px'}}
      placeholder={placeholder}
      fluid
      multiple = {(props.multiple === true) ? true : false }
      clearable = {(props.clearable === true) ? true : false }
      search
      selection
      onChange={(e, v) => callback(v.value) }
      options={
        props.values.map(r => Object.fromEntries(
          new Map([['key',r], ['text',r], ['value',r]])
        ))
      }
    />
  )

  // When a title is provided, wrap the dropdown menu in a form field
  if( props.title !== undefined ){
    return(
      <div
        className='item'
        style={style} >
        <Form>
          <Form.Field>
            <label>{props.title}</label>
            {Component}
          </Form.Field>
        </Form>
      </div>
    )
  }


  return(
    <div
      className='item'
      style={style} >

      {Component}

    </div>

  )
}
// value = {value}

export default DropdownMenu
