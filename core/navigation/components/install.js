/**
 * React Framework Component Installation
 * =========================================
 *
 * Installs the component's navigation and restapi requirements
 * by adding them to the project configuration (under the framework
 * application )
 *
 * @author Nik Sumikawa
 * @date Sept 15, 2020
 */



/**
 * Installs the user components and rest api framework requirements
 * @param  {object} proj_obj project configuration object
 * @param  {object} restapi     object containing the rest api parameters
 * @param  {Array} Production   Array of navitagion objects to add for the production release
 * @param  {Array} Development  Array of navitagion objects to add for the development release
 * @return {object}             project configuration object with updated restapi host/url
 */
export function install( proj_obj, restapi, Production, Development, defaultApp=false ){

  // install Production components as the default
  if( defaultApp ){
    // add the components when none exist in the project object
    if( !(Object.keys(proj_obj.Apps).includes('default')) ){
      proj_obj.Apps['default'] = Production
    }else{
      proj_obj.Apps['default'] = proj_obj.Apps['default'].concat(Production)
    }

  // install production components as secondary components
  }else{
    // add the components when none exist in the project object
    if( !(Object.keys(proj_obj.Apps).includes('framework')) ){
      proj_obj.Apps['framework'] = Production
    }else{
      proj_obj.Apps['framework'] = proj_obj.Apps['framework'].concat(Production)
    }

    // add the dev components when run under development
    if( (process.env.NODE_ENV === 'development')&(proj_obj.examples === true) ){
      proj_obj.Apps['framework'] = proj_obj.Apps['framework'].concat( Development )
    }
  }


  // add the restapi components when none exist in the project object
  if( !(Object.keys(proj_obj).includes('restapi')) ){
    proj_obj['restapi'] = restapi
    return proj_obj
  }

  // append the existing restapi parameters
  proj_obj['restapi']['host'] = {
    ...restapi['host'],
    ...proj_obj['restapi']['host']
  }

  proj_obj['restapi']['url'] = {
    ...restapi['url'],
    ...proj_obj['restapi']['url']
  }

  return proj_obj

}
