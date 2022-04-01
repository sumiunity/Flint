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

import Iframe from 'react-iframe'

import {FullScreen} from 'ReactFramework/components/Frameworks/SemanticUI/Modal'


export default function WebSegments( props ){

  var segments = []

  var activeComponent

  // populate the menu and segment buffers with the
  // contents for all pages we wish to render.
  for( var i=0; i < props.config.length; i++ ){

    const config = props.config[i]

    // create the component
    const Component = (
      <WebpageFramework
        {...props}
        key={`WebpageFramework-${config.name}`}
        activeItem = {props.activeItem}
        config = {config}
        />
    )


    if( props.activeItem === config.name ){
      activeComponent= Component
    }

    // add the component to be rendered
    segments.push( Component )


  }

  return(
    <div>
      {segments}

      <FullScreen
        {...props}
        open={props.fullScreen !== false}
        onClose={() => props.setFullScreen(false)}
        >
        {activeComponent}
      </FullScreen>

    </div>
  )
}


// wrap the iframe inside a segment to allow for control over the
// visibility based on the activeItem state
function WebpageFramework( props ){


  return(
    <div
      key={`WebpageDiv-${props.config.name}`}
      hidden={props.activeItem !== props.config.name}>

      <Iframe
        key={`Iframe-${props.config.name}`}
        url={ props.config.url }
        width="100%"
        height="950px"
        id={props.config.name}
        className="myClassname"
        display="initial"
        position="relative"/>

    </div>
  )
}
