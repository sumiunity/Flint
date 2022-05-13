import React from "react";

import {Segment, Dimmer, Loader } from 'semantic-ui-react'

// Generic Loading Icon
export default function LoadIcon( props ){

  if( (props.condition === false)|(props.condition === 0) ) return null

  return(
    <Segment style={{height: '100px'}}>
      <Dimmer
        active
        inverted={props.inverted === true ? true : false}
        >
        <Loader size='medium'>
          Loading
        </Loader>
      </Dimmer>
    </Segment>
  )

}
