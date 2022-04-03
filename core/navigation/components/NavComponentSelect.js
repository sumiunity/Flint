

import {appName} from './Path'

export default function NavComponentSelect(props){

  var components = []

  var app = appName(props)

  // add the components for the specified app
  if( Object.keys(props.projConfig.Apps).includes( 'framework' ) ){
    components = components.concat( props.projConfig.Apps['framework'] )
  }

  // add the components for the specified app
  if( Object.keys(props.projConfig.Apps).includes( app ) ){
    components = components.concat( props.projConfig.Apps[app] )
  }

  // add the default components when an app is not specified
  if((Object.keys(props.projConfig.Apps).includes('default'))&(app === '')){
    components = components.concat( props.projConfig.Apps['default'] )
  }

  return components
}
