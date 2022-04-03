


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

  if( path === undefined ) path = ""

  return url_extension + path

}
