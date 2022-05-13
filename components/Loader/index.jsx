import React from 'react'

import LoaderComponent from './LoaderComponent'

/**
 * Renders a loading symbol at first, and them an alter signalling that
 * more data is being retrieved, followed by an error message with teh
 * variables missing data
 * @param       {string} props.timeout amount of time to wait before state transistions
 * @param       {integer} props.params the parameters to check for data
 */
export default function loader( props, parameters ){

  // map the parameter to ensure that it is of array type
  var params = parameters
  if( typeof params === 'string' ) params = [params]

  // loop through each parameter and return a loading component
  // state when an undefined parameter is identified
  for( var i=0; i < params.length; i ++ ){
    if( props[params[i]] === undefined ){
      return(
        <LoaderComponent
          {...props}
          params = {params}
          />
      )
    }
  }


}
