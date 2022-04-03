
import {getJwt} from "../user/Jwt"
import FETCH from '../restapi/fetch'


// Sends the user and path information to the backend to
// record the websites usage
export default function postUsage( props ){

  // retrieve the user name from the local cache
  const profile = getJwt()

  var params = props
  if( params === undefined ) params = {}

  if( params.path === undefined) params['path'] = window.location.pathname

  if( params.username === undefined ){

    // do not log usage for user's not signed in
    if( profile === undefined ) return

    params['username'] = profile.username

    // // attempt to use the ip address of the user when available or
    // // default username to undefined
    // if( profile.username === undefined ){
    //   const ip_address = getIPAddress()
    //
    //   if( Object.keys(ip_address).includes('ip') ){
    //       params['username'] = ip_address.ip
    //   }
    // }
  }


  // use the profile name when provided in the params
  FETCH({
    method: 'POST',
    key: 'usage',
    parameters: params,
  })



}
