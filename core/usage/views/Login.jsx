import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react'

import fetch_user_profile from '../UserProfileQueries'


export function LoginPage( props ){
  // pull the logo from the props (defined in project.js) or use default image
  const logo = (props.logo === undefined) ? 'default/icon.png' : props.logo

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2'
          style={{color:'#6cb4ec'}}
          textAlign='center'>
          <Image src={logo} /> Log-in to your account
        </Header>

        <LoginForm {...props}/>

      </Grid.Column>
    </Grid>
  )
}

export function LoginForm( props ){

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

// authenticate and redirect when the user is valid
function authenticate(props, username, password, setIsLoading){
  // console.log( 'handling the submit ', username, password )
  // props.history.push( "/auth/UserProfile", {username:username})

  // set the isloading to signal the retrieval of data
  setIsLoading( true )

  // fetch the user information
  fetch_user_profile( username, props.setjwt, undefined, setIsLoading )
}

export default withRouter(LoginPage)
