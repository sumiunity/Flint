
import React from 'react';

import { Menu, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import postUsage from '../../../usage'

export default function HomeMenuItem( props ){


  // pull the logo from the props (defined in project.js) or use default image
  const logo = (props.logo === undefined) ? 'default/icon.png' : props.logo

  return(
      <Menu.Item
        key={`menuitem-HOME`}
        as={ Link }
        to={ `/${props.homepage}` }
        name={'HOME'}
        onClick={() => postUsage({'path': '/'})}
        style={{
          padding:'0 10px 0 10px',
          maxWidth:'180px',
          maxHeight:'50px'}}
        >
        <Image src={logo} style={{height:'50px'}}/>
      </Menu.Item>
  )
}
