
import React from 'react';

import FETCH from './fetch'

/**
 * Extend the base React component to handle fetch requests.
 * when used properly, the url will be looked up based on a key
 * and the resulting data will be stored into the state under
 * the key name. This standardizes the way data is retrieved.
 * @type {Object}
 */
export default class RestApi extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }


  get( props ){
    var params = props
    params['method'] = 'GET'
    params['callback'] = this._callback(props)
    FETCH( params )
  }

  post( props ){
    var params = props
    params['method'] = 'POST'
    params['callback'] = this._callback(props)
    FETCH( params )
  }

  put( props ){
    var params = props
    params['method'] = 'PUT'
    params['callback'] = this._callback(props)
    FETCH( params )
  }

  delete( props ){
    var params = props
    params['method'] = 'DELETE'
    params['callback'] = this._callback(props)
    FETCH( params )
  }

  /**
   * Generic callback function executed once the fetch has returned.
   * This stores the fetched data in a variable named the same as the
   * key in the state
   *
   * @param  {object} json_obj json object returned from the query
   * @param  {string} key      fetch key
   * @return {None}           no data is returned
   */
  callbackFunction( json_obj, props ){
    this.setState({[props.key]: json_obj})
  }


  _callback( props ){
    // execute the callback function. set to default when not provided
    var callback = props.callback
    if( callback === undefined ){
      callback = this.callbackFunction.bind(this)
    }
    return callback
  }


}
