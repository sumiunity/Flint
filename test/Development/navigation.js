/**
 * Routes
 * ============
 *
 * Routine that returns the routes based on the specified type.
 * Extend the switch statement when adding a new website
 *
 * :Author: Nik Sumikawa
 * :Date: Dec 16, 2019
 */



import Examples from './index'

import {install} from 'ReactFramework/navigation/components/install'


const restapi = {
  host: {},
  url: {}
}


var Components = [

  {
    // menu: 'Development',
    name: 'Development',
    path:'/Development',
    component: Examples,
    auth: 'public',
    // show: true,
  },

]


/**
 * Installs the generuc rest aou components and rest framework requirements
 * @param  {object} project_obj project configuration object
 * @return {object}             project configuration object with updated restapi host/url
 */
export default function install_development( proj_obj ){
  return install( proj_obj, restapi, Components, [] )
}
