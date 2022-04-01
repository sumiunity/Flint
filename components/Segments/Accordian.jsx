/**
 * Accordian Segments
 * ========================
 *
 * A Titled segment that unfolds when the title is selected
 *
 * @author Nik Sumikawa
 * @date Nov 10, 2020
 */

import React, {useState} from 'react';

import _ from 'lodash'
import {Segment} from 'semantic-ui-react'


export default function AccordianSegments( props ){

  const [visible, setVisible] = useState((props.visible === undefined ? true : props.visible))

  // when hidden, only show the title with the ability to expand
  // the segement
  if( visible === false ){
    return(
      <Segment
        key = {`parentSegment - ${_.uniqueId('id_')}`}
        onClick={() => setVisible(!visible)}>
        <h2>{props.title}</h2>
      </Segment>
    )
  }


  return (
    <Segment
      key = {`parentSegment - ${_.uniqueId('id_')}`}
      >
      <div  onClick={() => setVisible(!visible)}>
        <h2>{props.title}</h2>
      </div>

      <Segment
        key = {`childSegment - ${_.uniqueId('id_')}`}
        basic
        style={{border:'0px', overflowX:'auto'}}>
        {props.component}
      </Segment>
    </Segment>
  )

}
