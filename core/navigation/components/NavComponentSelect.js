/**
 * Mavigation Component Select
 * ==============================
 *
 * Returns the components of the navigation select structure
 * for the specified type. The landing structure components
 * are also included as they should be included in all routes
 *
 * :Author: Nik Sumikawa
 * :Date: Dec 16, 2019
 */


// import {CoreComponents} from '../../components/Core/navigation'
// import PlugginComponents from '../../components/Pluggins/navigation'

import projectConfig from '../../../../project'
import {appName} from './Path'

export default function NavComponentSelect(){

  var components = []

  var app = appName()

  // add the components for the specified app
  if( Object.keys(projectConfig.Apps).includes( 'framework' ) ){
    components = components.concat( projectConfig.Apps['framework'] )
  }

  // add the components for the specified app
  if( Object.keys(projectConfig.Apps).includes( app ) ){
    components = components.concat( projectConfig.Apps[app] )
  }

  // add the default components when an app is not specified
  if((Object.keys(projectConfig.Apps).includes('default'))&(app === '')){
    components = components.concat( projectConfig.Apps['default'] )
  }

  return components
}
