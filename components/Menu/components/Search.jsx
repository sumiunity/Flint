/**
 * Search Menu Component
 * ======================
 *
 * Search menu component with callback function when
 * enter or the search button is selected
 *
 * @author Nik Sumikawa
 * @date Nov 4, 2020
 */



import React, {useState} from 'react';

import {
  Input,
  Icon,
  Menu,
} from 'semantic-ui-react'

/**
 * Input component used to track the key strokes entered
 * by the user and execute a callback function when enter
 * or the button is pressed
 * @param       {function} props.callback callback function executed when the button or enter is pressed
 * @param       {string} props.placeholder default string entered in the search box (i.e. placeholder)
 * @constructor
 */
export function SearchMenu( props ){

  const [searchValue, setSearchValue] = useState('')

  var callback = (value) => console.log( 'not implemented', value)
  if( props.callback !== undefined ) callback = props.callback

  var placeholder = 'Search...'
  if(props.placeholder !== undefined ) placeholder = props.placeholder


  return(
    <Menu.Menu position='right'>
      <div className='ui right aligned category search item'>
        <Input
          transparent={true}
          icon={
            <Icon
              style={{margin:0,padding:0, top:'-4px'}}
              name='search'
              inverted
              circular
              link
              color='red'
              onClick={() => callback(searchValue)}
              />
          }
          onKeyDown={(e) => {
            if( e.keyCode === 13 ){
              callback(searchValue)
            }else {
              setSearchValue( e.target.value)
            }
          }}
          onChange={(e) => {setSearchValue( e.target.value)}}
          placeholder={placeholder}
          />

      </div>
    </Menu.Menu>

  )
}


export default SearchMenu
