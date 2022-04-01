/**
 * Date Menu Component
 * ========================
 *
 * Date interface used to generated the start and end
 * time based on the specified date type. This is useful
 * when observing data over a specific timeframe
 *
 * @author Nik Sumikawa
 * @date Nov 4, 2020
 */



import React from 'react';

import { HorizontalDate, VerticalDate } from '../../Filter/views/Date'
import {  Menu } from 'semantic-ui-react'

/**
 * Standarized Date Menu for horizontal Menu
 * @param       {function} props.callback callback function executed when the button or enter is pressed
 * @constructor
 */
export function HorizontalDateMenu( props ){

  var callback = (value) => console.log( 'not implemented', value)
  if( props.callback !== undefined ) callback = props.callback

  return(

    <Menu.Menu position='right'>
      <div className='ui right aligned category search item'>

        <HorizontalDate
          {...props}
          callback={callback}
        />
      </div>
    </Menu.Menu>

  )
}


/**
 * Standarized Date Menu for Verical Menu
 * @param       {function} props.callback callback function executed when the button or enter is pressed
 * @constructor
 */
export function VerticalDateMenu( props ){

  var callback = (value) => console.log( 'not implemented', value)
  if( props.callback !== undefined ) callback = props.callback

  return(

    <Menu.Menu position='right'>
      <div className='ui right aligned category search item'>

        <VerticalDate
          {...props}
          callback={callback}
        />
      </div>
    </Menu.Menu>

  )
}
// value = {value}
