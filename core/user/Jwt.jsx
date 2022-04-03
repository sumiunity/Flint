/**
 * User Information
 * ===================
 *
 * retrieves and sets the user information that is stored locally
 * in the browser cache.
 *
 * @author Nik Sumikawa
 * @date Aug 12, 2020
 *
 */


import projConfig from '../../../project'

import {getBrowserCache, setBrowserCache} from "./LocalStorage"

/**
 * Checks the jwt. If it does not exist, it is pulled from the
 * browser cache. When the brower cache does not have the jwt,
 * the user is directed to the login page
 * @param  {Object} jwt               object containing the user information as a jwt
 * @return {Component}     Returns the login page when the user is not logged in
 */
export function checkJwt(jwt, callback){

  // skip user information when the authentication is not enabled
  if( projConfig.authentication.enable === false ) return true

  if( (jwt === undefined)|(jwt === false) ){
    // pull the jwt from the browser cache
    const profile = getJwt()

    // return the login page when the user was not logged in
    if( (profile.username === undefined)|(profile.username === '') ){
      return false

    // execute callback with the user information
    }else{
      callback(profile)
    }
  }

  return true

}

// retrieves the user information from the broswer cache
export function getJwt(){
  var name = projConfig.authentication.name
  return getBrowserCache(name)
}

// pushs the user information into the browser cache
export function setJwt( data ){
  var name = projConfig.authentication.name
  return setBrowserCache(name, data)
}


export default checkJwt
