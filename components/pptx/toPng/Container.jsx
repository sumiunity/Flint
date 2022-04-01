/**
 * Container
 * @desc A container holds the rendered component with a reference used to convert the content to a canvas
 *
 * @author Nik Sumikawa
 * @date Jan 6, 2020
 */


import React from 'react'


/**
 * Renders the slide and converts the component into
 * a Data URL, which is returned to the parent function.
 * This is needed for generating presentations
 * @param  {string} props.title slide title
 * @param  {object} props.Component component to render
 * @param  {function} props.callback callback function which returns the Data URL of the converted component
 */
export default class Container extends React.Component {

  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  componentDidMount(){

    // when a callback function is provided, convert the
    // component into a Data URL and return to the parent
    if( this.props.callback !== undefined ){
      const ref = this.componentRef

      this.props.callback( {
        ...this.props,
        ...{ref: ref}
      })
    }
  }



  render() {

    var style = {}
    if( this.componentRef.current !== null ){
      style['display'] = 'inline-block'
      // style['width'] = this.componentRef.current.clientWidth * 0.98
      // style['height'] = this.componentRef.current.clientHeight * 1.02
      style['width'] = this.componentRef.current.clientWidth
      style['height'] = this.componentRef.current.clientHeight 
    }

    return (
      <div ref={this.componentRef} style={style}>
        {this.props.Component}
      </div>
    );
  }
}
