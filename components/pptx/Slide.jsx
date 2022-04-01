
import React from 'react'

import {
  Header,
  Segment
} from "semantic-ui-react"

import Container from "./toPng/Container";

export default function Slide( props ){

  var title
  if( props.title !== undefined ) title = props.title

  var description
  if( props.description !== undefined ) description = props.description

  return(
    <Segment.Group>
      <Segment>
        <Header as="h2">{title}</Header>
        <span>{description}</span>
      </Segment>

      <Segment style={{overflowY:'auto'}}>
        <Container {...props} />
      </Segment>

    </Segment.Group>
  )

}
