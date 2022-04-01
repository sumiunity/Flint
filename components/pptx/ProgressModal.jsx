/**
 * Progress Modal
 * @description converts all components to images and creates a pptx. A progress bar is used to show the state
 * @author Nik Sumikawa
 * @date Jan 6, 2020
 */

import React from 'react';

import {Progress } from 'semantic-ui-react'
import moment from 'moment'

import toPng from './toPng/toPng'
import toPptx from "./index"

export default class ProgressModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {pngArray:[]}
  }

  // convert all components into png when first mounted
  async componentDidMount(){

    if( this.props.refArray !== undefined ){

      for( var i=0; i < this.props.refArray.length; i++ ){

        // must persist the ref data for the callback function
        const ref = this.props.refArray[i]

        // convert the component to a png
        await toPng(
          ref.ref,
          {callback:(obj) => {
            var pngArray = this.state.pngArray


            pngArray.push({
              ...ref,
              ...obj
            })

            this.setState({pngArray:pngArray})
          }} )
        console.log( this.props.refArray[i].label, moment()._d)
      }
    }

    return true
  }

  async shouldComponentUpdate(nextProps, nextState){
    return true
  }

  // create the powerpoint presentation and close the modal
  generate_pptx(){
    toPptx({
      slides:this.state.pngArray.concat(this.props.pptxgenSlides),
      filename: this.props.filename,
      template: this.props.template
    })

    // close the modal when the pptx is generated
    if( this.props.onClose !== undefined){
      this.props.onClose()
    }
  }


  render() {


    const completed = this.state.pngArray.length + this.props.pptxgenSlides.length
    const total = this.props.refArray.length + this.props.pptxgenSlides.length
    const progress = (100.0*completed) / total

    // create the powerpoint when all images are generatd
    if( progress >= 100 ) this.generate_pptx()

    return (
      <div>
        <Progress percent={progress.toFixed(1)} indicating progress/>
      </div>
    );
  }
}
