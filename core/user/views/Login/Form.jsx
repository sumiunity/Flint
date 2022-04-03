import React, {useState} from 'react'

import {
  Button,
  Form,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react'

import authenticate from './Authenticate'



export default function LoginForm( props ){

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return(
    <>

      {(isLoading === true)
        ? <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>

        : null
      }

      <Form size='large'

          style={{width:'100%'}}>
        <Segment
          style={{width:'100%'}}
          stacked
          color='green'
          >
          <Form.Input
            style={{width:'100%'}}
            icon='user'
            iconPosition='left'
            placeholder='User Name'
            value={username}
            onChange={(e) => setUsername(e.target.value.toUpperCase())}
            />

          {props.passwordRequired
            ?
              <Form.Input
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                />
            : null
          }
          <Button
            style={{backgroundColor:'#83c8ff'}}
            fluid
            size='large'
            onClick={()=> authenticate( props, username, password, setIsLoading ) }>
            Login
          </Button>
        </Segment>
      </Form>
    </>
  )
}
