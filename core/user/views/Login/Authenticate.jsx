

import fetch_user_profile from '../../UserProfileQueries'

// authenticate and redirect when the user is valid
export default function authenticate(props, username, password, setIsLoading){

  // set the isloading to signal the retrieval of data
  setIsLoading( true )

  // fetch the user information
  fetch_user_profile( username, props.setjwt, undefined, setIsLoading )
}
