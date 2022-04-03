
import {setJwt} from "./Jwt"
import urlPattern from '../restapi/urlPattern'



export async function fetch_user_profile( username, setjwt, callback, setIsLoading ){

  try {

    const query = urlPattern({
      key: 'user',
      params: { username: username }
    })


    const res = await fetch( query );
    const json_obj = await res.json();

    // deactivate the isloading wheel once the data is retrieved
    if( setIsLoading !== undefined ) setIsLoading( false )

    // post an error message when user information is not returned
    if( Object.entries(json_obj).length === 0 ){
      alert( 'invalid user. please try again')
      return
    }


    // set the user profile  variable in the browser storage
    setJwt( json_obj )
    if( setjwt !== undefined ) setjwt( json_obj )


    if( callback !== undefined ) callback( {profile: json_obj} )

  } catch {
    console.log( 'encountered error during retrieval' )
  }

}

export default fetch_user_profile
