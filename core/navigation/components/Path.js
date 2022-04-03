


/**
 * Adds the project name between the origin and the url. This is
 * needed when launching multiple applications on the same server
 * i.e. the application is not launched at the root
 * @param  {String} path               Url string
 * @return {String}      url string with the project name
 */
export default function pathname(props, path){

  // extend the hostname with the homepage. When running the project
  // locally, do not add this homepage extension
  var url_extension = props.projConfig.homepage
  if( url_extension !== undefined ){
    if( (url_extension[0] !== '/')&(url_extension.length > 0) ) url_extension = '/' + url_extension
  }

  // extract the app name from the url
  const app_name = appName(props)

  if( path === undefined ) path = ""

  // remove the leading slash when present
  if( path[0] === '/' ) path = path.slice(1)

  if( app_name === '' ) return `${url_extension}/${path}`

  return `${url_extension}/${app_name}/${path}`

}


// returns the application name based on the current pathname
export function appName(props){

  // retrieve the pathname from the window
  var pathname = window.location.pathname

  // parse out the homepage name
  pathname = pathname.replace( `/${props.projConfig.homepage}`, '' )

  // remove leading forward slash when present
  if( pathname[0] === '/' ) pathname = pathname.slice(1, pathname.length)

  pathname = pathname.split('/')

  // return empty string when the path name does not contain an app name
  if( pathname.length === 0 ) return ''

  const app_name= pathname[0]

  // return empty string when the app_name doesn't match the provided apps
  if( !(Object.keys(props.projConfig.Apps).includes(app_name)) ) return ''

  return app_name

}
