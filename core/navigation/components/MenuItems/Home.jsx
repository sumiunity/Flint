
import React from 'react';

import { Menu, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import postUsage from '../../../usage'

export default function HomeMenuItem( props ){


  // pull the logo from the props (defined in project.js) or use default image
  const logo = (props.projConfig.logo === undefined) ? 'images/icon.png' : props.projConfig.logo

  return(
      <Menu.Item
        key={`menuitem-HOME`}
        as={ Link }
        to={ `/${props.projConfig.homepage}` }
        name={'HOME'}
        onClick={() => postUsage({'path': '/'})}
        style={{
          padding:'0 10px 0 10px',
          maxWidth:'180px',
          maxHeight:'50px'}}
        >

        <Image
          src={`${process.env.PUBLIC_URL}/${logo}`}
          style={{height:'50px'}}
          />

      </Menu.Item>
  )
}
