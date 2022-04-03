import React from 'react'
import { withRouter } from 'react-router-dom';

import {
  Grid,
  Header,
  Image,
} from 'semantic-ui-react'

import LoginForm from './Form'


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


export default withRouter(LoginPage)
