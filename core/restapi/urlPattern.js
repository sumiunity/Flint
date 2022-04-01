/**
 * REST API React Component
 * =============================
 *
 * Component containing get generic fetch functions that store
 * data into a state varible. The purpose is to standardize the
 * fetch function calls and the state variables populated to
 * create consistency across multiple components.
 *
 * :Author: Nik Sumikawa
 * :Date: April 22, 2020
 *
 *   */



import projectConfig from '../../../project'



// returns the URL pattern for the host, relative url and parameters
// based on the specified key. When no key is provided, the host and
// relative url patterns from the props itself.
export default function urlPattern( props ){

  // default the host and url to what is passed in the props
  var host = props.host
  var relativeUrl = props.relativeUrl


  // when a key is provided, extract the host and relative url
  // fromt he project configuration file
  if( props.key !== undefined ){
    var urlInfo = projectConfig.restapi.url[props.key]
    if( urlInfo !== undefined ){
      host = projectConfig.restapi.host[urlInfo.host]
      relativeUrl = projectConfig.restapi.url[props.key].url
    }
  }


  // set to the default host when it is undefined
  if(host === undefined) host = projectConfig.restapi.host.default

  var params = props.params
  if( params === undefined ) params = {}

  return host + relativeUrl + querystring( params )
}



/**
 * Formats the parameters for a get request
 * @param  {Object} [query={}]               object containing urlParameters
 * @return {string}            string formatted with parameters for get request
 */
function querystring(query = {}) {
   // get array of key value pairs ([[k1, v1], [k2, v2]])
   const qs = Object.entries(query)
     // filter pairs with undefined value
     .filter(pair => pair[1] !== undefined)
     // encode keys and values, remove the value if it is null, but leave the key
     .map(pair => pair.filter(i => i !== null).map(encodeURIComponent).join('='))
     .join('&');

   return qs && '?' + qs;
}
