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

import React, {useState} from 'react';


import MenuItems from './MenuItems'
import WebSegments from './WebSegments'



export default function IframeMenu( props ){

  const [activeItem, setActiveItem] = useState(props.config[0].name)
  const [fullScreen, setFullScreen] = useState(false)


  return (
    <div>

      <MenuItems
        {...props}
        activeItem = {activeItem}
        setActiveItem = {setActiveItem}
        setFullScreen = {setFullScreen}
        />

      <WebSegments
        {...props}
        activeItem = {activeItem}
        fullScreen = {fullScreen}
        setFullScreen = {setFullScreen}
        />

    </div>

  )
}

//
