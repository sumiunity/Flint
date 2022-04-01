
/**
 * Checks the isAdmin status. This is used to enable admin level
 * development privledges
 * @param  {Object}  props               Object containing Parameters
 * @return {Boolean}       True when isAdmin is set, otherwise false
 */
export default function isAdmin(props){

  // return true when the isAdmin field is set in the jwt
  if( props.jwt !== undefined ){
    if( props.jwt.isAdmin !== true ){
      return true
    }
  }

  // return true, when isAdmin is set as a prop
  if( props.isAdmin === true ){
    return true
  }

  return false
}
