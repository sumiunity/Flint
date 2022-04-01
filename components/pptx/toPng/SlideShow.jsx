/**
 * Slide Show
 * @description converts an array of components into png and displays them as a SlideShow
 * @author Nik Sumikawa
 * @date Jan 6, 2020
 */

import React from 'react';

import {Input } from 'semantic-ui-react'


import toPng from './toPng'
import Slide from './Slide'
import toPptx from "../index"

export default class SlideShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {refStruct:[]}
  }

  // convert all components into png when first mounted
  componentDidMount(){
    if( this.props.refArray !== undefined ){

      for( var i=0; i < this.props.refArray.length; i++ ){

        // must persist the ref data for the callback function
        const ref = this.props.refArray[i]

        // convert the component to a png
        toPng(
          ref.ref,
          {callback:(obj) => {
            var refStruct = this.state.refStruct


            refStruct.push({
              ...ref,
              ...obj
            })

            this.setState({refStruct:refStruct})
          }} )
      }
    }

  }

  shouldComponentUpdate(nextProps, nextState){
    return true
  }

  render() {

    var slideshow = []
    for( var i=0; i < this.state.refStruct.length; i++ ){
      slideshow.push(
        <Slide
          key={`Slide-${i}`}
          {...this.state.refStruct[i]} />
      )

    }

    return (
      <div>
        <div style={{textAlign:'right'}} >
          <Input
            action={{
              color: 'teal',
              labelPosition: 'right',
              icon: 'file',
              content: 'Enter',
              onClick: () => toPptx({
                slides:this.state.refStruct,
                filename: this.state.filename
              })
            }}
            placeholder='Filename...'
            onChange={(event, data) => this.setState({filename:data.value})}
            />
        </div>

        {slideshow}
      </div>
    );
  }
}
