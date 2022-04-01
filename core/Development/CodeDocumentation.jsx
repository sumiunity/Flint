/**
 * Code Documentation
 * ========================
 *
 * Component used for code documentation including an example
 * with the code used to render the example
 *
 * @author Nik Sumikawa
 * @date Nov 2, 2020
 */

import React, {useState} from 'react';
import {Segment, Grid} from 'semantic-ui-react'


export function FixedDocument( props ){

  const [visible, setVisible] = useState((props.visible === undefined ? true : props.visible))

  // when hidden, only show the title with the ability to expand
  // the segement
  if( visible === false ){
    return(
      <Segment onClick={() => setVisible(!visible)}>
        <h2>{props.title}</h2>
      </Segment>
    )
  }


  return (
    <Segment>
      <div  onClick={() => setVisible(!visible)}>
        <h2>{props.title}</h2>
      </div>
      <Segment style={{backgroundColor: '#FFFFE0'}}>
        <p style={{ whiteSpace: 'pre'}}> {props.code} </p>
      </Segment>

      <Segment style={{overflowX:'auto'}}>
        {props.component}
      </Segment>
    </Segment>
  )

}



// wraps the fixed code documentation framework in the
// grid structure to provide one line per example
export function Example( props ){


  return (
    <Grid.Row style={{padding:0}}>
      <Grid.Column>

        <FixedDocument {...props} />

      </Grid.Column>
    </Grid.Row>
  )
}
