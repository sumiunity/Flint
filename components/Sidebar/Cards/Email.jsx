
import React from 'react';

import {Card, Button} from 'semantic-ui-react'

import email from "../../email";


export default function UpdateEmail( props ){

  if( props.email === undefined ) return null

  var header = (props.header !== undefined) ? props.header :  `<Header>`
  var description = (props.description !== undefined) ? props.description :  `<Description>`
  var subject = (props.email.subject !== undefined) ? props.email.subject :  `<Subject>`
  const body = (props.email.body !== undefined) ? props.email.body : 'Hello,%0A%0<Contents>'

  return(
    <Card key={`card - ${header}`} style={{width: '100%'}}>
      <Card.Content>
        <Card.Header content={header} />
        <Card.Description content={description} />
          <Button
            primary
            style={{width:'100%', marginTop: '10px'}}
            onClick={() => email( props.email, subject, body)}
            >
            Send
          </Button>
      </Card.Content>
    </Card>
  )

}
