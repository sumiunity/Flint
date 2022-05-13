

import urlPattern from './urlPattern'


/**
 * Standard Fetch routine. This allow for both url and url lookups
 * based on a specified key. It also manages get requests differently
 * in terms of parameter handling
 * @param       {Object} props  Parameters
 * @constructor
 */
export async function FETCH( props ){

  // extract the params from the props. default to an empty object
  var params = (props.parameters === undefined) ? {} : props.parameters

  // by default retrieve the url from the props
  var url = props.url

  // look up the url using the key when the url is not provided
  if( (url === undefined)&(props.key !== undefined) ){

    // format the url string differently for get requests
    if( props.method === 'GET'){
      url = urlPattern({key: props.key}, params)
    } else {
      url = urlPattern({key: props.key})
    }

  //log error to the console
  } else {
    console.log( 'ERROR - insufficient parameters for FETCH' )
  }


  // default fetch parameters
  var parameters = {
    method: props.method,
    headers: {
      // 'Authorization': 'Token ' + user.token,
      'Content-Type':'application/json'
    },
    mode: 'cors',
    cache: 'default',
  }

  // format the url string differently for get requests
  if( props.method !== 'GET'){
    parameters['body'] = JSON.stringify(params)
  }

  const res = await fetch(url, parameters);

  try {
    var json_obj = await res.json();
  } catch {
    console.log( 'ERROR - cannot parse response json object')
  }


  if( props.callback !== undefined ){
    props.callback( json_obj, props )
  }

}

export default FETCH;
