
import React from 'react'

import Alert from '../Alerts'

import LoadIcon from './Icon'


/**
 * Renders a loading symbol at first, and them an alter signalling that
 * more data is being retrieved, followed by an error message with teh
 * variables missing data
 * @param       {string} props.timeout amount of time to wait before state transistions
 * @param       {integer} props.params the parameters to check for data
 */
export default class LoaderComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {interval:0};
  }



  // When the component mounts, retrieve the  reference binmap
  // and the location of all hotspot events
  componentDidMount(){
    var timeout = 30000
    if( this.props.timeout !== undefined ) timeout = this.props.timeout

    this.setState({
      counter: setInterval(this.checkState.bind(this), timeout),
      timeout: timeout,
    })
  }

  componentWillUnmount(){
    // turn off the counter
    clearInterval(this.state.counter )
  }

  // identifies the parameters missing data and raises the error flag
  checkState(){

    if( this.state.interval === 0 ){
      this.setState({interval: 1, open: true})
      return
    }

    var parameters = []

    // loop through each parameter and return a loading component
    // state when an undefined parameter is identified
    for( var i=0; i < this.props.params.length; i ++ ){
      const param = this.props.params[i]
      if( this.props[param] === undefined ){
        parameters.push( param )
      }
    }

    // turn off the counter
    clearInterval(this.state.counter )

    // update the state with an error flag and a list of parameters
    // causing the error
    this.setState({
      error: true,
      interval: 2,
      parameters: parameters,
    })
  }


  render(){

    // console.log( this.state )
    var alert

    /// return an info message telling the user that the data
    /// is still being retrieved
    if( this.state.interval === 1 ){
      alert = (
        <Alert
          key={'info-alert'}
          severity={'info'}
          title={'Still Loading'}
          timeout={this.state.timeout}
          message={'... continuing to attempt to download data'}
        />
      )
    }

    // return an error message with the missing variable
    if( this.state.error === true ){
      alert = (
        <Alert
          key={'error-alert'}
          severity={'error'}
          timeout={100000}
          title={'ERROR - Cannot retrieve data'}
          message={'Missing data:' + this.state.parameters.toString() }
          />
      )
    }

    // return a lodaing icon when the data is being retrieved
    return(
      <div>
        {alert}
        <LoadIcon inverted={true}/>
      </div>
    )
  }

}
