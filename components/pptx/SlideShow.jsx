/**
 * PPTX Slideshow
 * ===============
 *
 * Renders a collection of power point slides and
 * tracks the url data created by each slide/component
 * to enable the power point export
 *
 * @author Nik Sumikawa
 * @date Oct 21, 2020
 */


import React from 'react'

import { Input, Modal, Button } from 'semantic-ui-react'

import Slide from './Slide'
import ProgressModal from "./ProgressModal";


/**
 * Renders a collection of slides with a button to export
 * the contents as a power point presentation. The slides
 * are shown in separate raised segments to differentiate
 * the content on each slide
 * @param       {Array} props.slides Array of slide content including component and title
 * @constructor
 */
export class SlideShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filename: (props.filename === undefined) ? 'default.pptx' :  props.filename,
      refArray:[],
      ContainerArray : [],
      showModal: false,
    }
  }

  // wrap all components into containers and track their reference id
  componentDidMount(){
    this.createSlides(this.props)
  }

  shouldComponentUpdate(nextProps, nextState){

    if(nextProps.ComponentArray !== this.state.ComponentArray){
      this.createSlides(nextProps)
    }

    return true
  }

  /// wraps each component in a slide that includes formatting and a reference, which
  /// is used to convert the component into an image
  createSlides(props){

    if(props.ComponentArray !== undefined){
      var containers = []

      // extract all components not in pptxgen format (assuming they are components)
      const components = props.ComponentArray.filter( r => r.pptxgenFormat !== true )

      for( var i=0; i < components.length; i++ ){
        containers.push(
            <Slide
              key={`slide: ${i}`}
              {...components[i]}
              slideNum = {(components[i].slideNum !== undefined) ? components[i].slideNum : i}
              callback={(ref) => {
                var temp = this.state.refArray
                temp.push(ref)
                this.setState({refArray: temp})
              }}
              />
        )
      }

      // separate the slides that are in pptx format as these
      // should be added directly, not converted from png
      const pptxgenSlides = props.ComponentArray.filter( r => r.pptxgenFormat === true )

      this.setState({
        ContainerArray: containers,
        pptxgenSlides: pptxgenSlides,
        ComponentArray: props.ComponentArray
      })
    }

  }

  render(){

    var inputOnClick = () => this.setState({showModal:true})
    if( this.props.disabled === true ) inputOnClick = () => alert('Wait, data is still being gathered')


    // console.log( 'slideshow', this.props, this.state)
    // if( this.state.ContainerArray.length === 0) return <LoadIcon/>
    return(
      <div>
        <div style={{textAlign:'right'}} >
          <Input
            action={{
              color: 'teal',
              labelPosition: 'right',
              icon: 'file',
              content: 'Save',
              onClick: inputOnClick,
              loading: (this.props.disabled === true)
            }}
            disabled={this.props.disabled === true}
            value={this.state.filename}
            placeholder='Filename...'
            onChange={(event, data) => this.setState({filename:data.value})}
            />
        </div>

        {this.state.ContainerArray}

        <Modal
          key={'progress modal'}
          onClose={() => this.setState({showModal:false})}
          open={this.state.showModal}
        >
          <Modal.Header>Generating PPTX</Modal.Header>
          <Modal.Content style={{width:'100%'}}>
            <ProgressModal
              {...this.props}
              {...this.state}
              />
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Cancel"
              labelPosition='right'
              icon='remove'
              onClick={() => this.setState({showModal:false})}
              negative
            />
          </Modal.Actions>
        </Modal>


      </div>

    )

  }
}


export default SlideShow;
