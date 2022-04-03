
/**
 * Installs plugin components and restapi into the master object
 * @param  {object} master  master configuration object
 * @param  {object} plugin  plugin configuration object
 * @return {object}         updated configuration object
 */
export function install( master, plugin ){

  // add the plugin components to the master set of components
  if( plugin.Components !== undefined ){
    // push the plugins directly when the master components do not exist
    if( master.Components === undefined ){
      master['Components'] = plugin.Components

    //otherwise extend the list of components
    }else{
      master.Components = master.Components.concat(plugin.Components)
    }
  }



  // add the restapi components when none exist in the project object
  if( plugin.restapi !== undefined ){
    // push the plugins directly when the master does not exist
    if( master.restapi === undefined ){
      master['restapi'] = plugin.restapi

    //otherwise extend the restapi taking the master as a priority
    }else{
      // append the existing restapi parameters
      master['restapi']['host'] = {
        ...plugin['restapi']['host'],
        ...master['restapi']['host']
      }

      master['restapi']['url'] = {
        ...plugin['restapi']['url'],
        ...master['restapi']['url']
      }
    }
  }


  return master

}

export default install
