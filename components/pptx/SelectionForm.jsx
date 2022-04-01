/**
 * Generates a selection form based on the Component array
 * and filters out all labels deselected
 *
 * @author Nik Sumikawa
 * @date Feb 10, 2020
 */

import React from 'react';

import { Button, Checkbox, Form, Header } from 'semantic-ui-react'

import jsonArray from '../../jsonArray'
import SemanticModal from '../../Frameworks/SemanticUI/Modal'
import SlideShow from "./SlideShow";

export default class PptxSelectionForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSlideShow: false,
      labels:[]
    }

    // overwrite the default state with what is passed in from the props
    if( props.formState !== undefined ) this.state = props.formState
  }

  componentDidMount(){
    this.init_state(this.props.ComponentArray)
  }

  shouldComponentUpdate(nextProps, nextState){

    if(this.props.ComponentArray !== nextProps.ComponentArray){
      this.init_state(nextProps.ComponentArray)
    }
    return true
  }

  // initializes the state based ont eh component array. This should
  // be redone when the Component array changes from the parent
  init_state( ComponentArray ){
    // Initialize the form button state for each component
    if( ComponentArray === undefined ) return

    var labels = []
    var formState = {}

    for( var i=0; i < ComponentArray.length; i++ ){
      const label = ComponentArray[i].label

      // retreive the selected status from the local state
      var currState = this.state[label]

      // set the initial selected state from the component array, defaulting to true
      if( currState === undefined ){
        currState = true
        if(ComponentArray[i].selected !== undefined) currState = ComponentArray[i].selected
      }

      if( labels.includes(label) === false ){
        labels.push( label )
        formState[label] = currState
      }
    }


    // add the group names to the label array
    var groups = [...new Set(ComponentArray.map(r => r.group))]
    labels = labels.concat(groups.filter(r => r !== undefined))

    // default all groups to selected
    groups.filter(r => r !== undefined).forEach(r => formState[r] = true)

    formState['labels'] = labels

    // extract the components metadata (everything but the component)
    var componentMetadata = []
    var componentLabels = []
    for( i=0; i < ComponentArray.length; i++ ){
      const keys = Object.keys(ComponentArray[i])

      var metadata = {}
      for( var j=0; j < keys.length; j++ ){
        const key = keys[j]
        if( key === 'Component' ) continue
        metadata[keys[j]] = ComponentArray[i][key]
      }

      if(componentLabels.includes(metadata.label)) continue

      componentLabels.push(metadata.label)
      componentMetadata.push( metadata)
    }

    this.setState({
      ...formState,
      ...{componentMetadata: new jsonArray(componentMetadata)}
    })

  }

  /// returns the form components and an array of valid labels
  /// for all items belonging to groups
  groupLabels(){

    var formContent = []
    var validLabels = []

    if( this.state.componentMetadata !== undefined ){
      var groups = this.state.componentMetadata.groupby(['group'])
      groups = groups.filter(r => r.count > 0)


      for( var i=0; i < groups.length; i++ ){

        const group = groups[i]

        if( group.group === undefined ) continue

        /// create a checkbox for the group label that controls
        /// a universal state across all children
        formContent.push(
          <Form.Field key={`pptx-selection-form-field-${group.group}`}>
            <Checkbox
              key={`pptx-selection-checkbox-${group.group}`}
              label={group.group}
              checked={this.state[group.group]}
              style={{fontWeight: 'bold', fontSize: '18px'}}
              onClick={() => {
                const groupState = !this.state[group.group]
                const labels = group.json_obj.unique('label')

                var changeState = {[group.group]: !this.state[group.group]}
                for( var j=0; j < labels.length; j++ ){
                  changeState[labels[j]] = groupState
                }
                this.setState(changeState)
              }}
              />
          </Form.Field>
        )

        // create a checkbox for each children in the group
        for( var j=0; j < group.json_obj.length; j++ ){
          const label = group.json_obj[j].label

          // populate the form content
          formContent.push(
            <Form.Field
              key={`pptx-selection-form-field-${label}`}
              style={{marginLeft: '20px'}}
              >
              <Checkbox
                key={`pptx-selection-checkbox-${label}`}
                checked={this.state[label]}
                label={label}
                onClick={() => this.setState({[label]: !this.state[label]})}
                />
            </Form.Field>
          )

          /// assign all selected componetns to the component array
          if( this.state[label] ) validLabels.push( label )

        }
      }

    }

    return {
      formContent: formContent,
      validLabels: validLabels,
    }
  }


  /// returns the form components and an array of valid labels
  /// for all items belonging to groups
  nongroupLabels(){

    var formContent = []
    var validLabels = []

    if( this.state.componentMetadata !== undefined ){

      var components = [...new Set(this.state.componentMetadata.filter(r => r.group === undefined))]

      for( var i=0; i < components.length; i++ ){

        const label = components[i].label

        // populate the form content
        formContent.push(
          <Form.Field
            key={`pptx-selection-form-field-${label}`}
            >
            <Checkbox
              key={`pptx-selection-checkbox-${label}`}
              checked={this.state[label]}
              label={label}
              onClick={() => this.setState({[label]: !this.state[label]})}
              />
          </Form.Field>
          )

        /// assign all selected componetns to the component array
        if( this.state[label] ) validLabels.push( label )
      }

    }

    return {
      formContent: formContent,
      validLabels: validLabels,
    }
  }


  render(){

    var formContent = []
    var validLabels = []

    var groupContent = this.groupLabels()

    formContent = formContent.concat(groupContent.formContent)
    validLabels = validLabels.concat(groupContent.validLabels)

    var nonGroupContent = this.nongroupLabels()

    formContent = formContent.concat(nonGroupContent.formContent)
    validLabels = validLabels.concat(nonGroupContent.validLabels)


    var ComponentArray = this.props.ComponentArray.filter(r => validLabels.includes(r.label))

    return(
      <div>
        <Header as='h2'>Select Slides</Header>
        <Form>
          {formContent}
          <Button
            primary
            style={{width:'100%'}}
            onClick={() => {
              this.setState({showSlideShow: true})

              // callback used to updated the parent state so we
              // can check to enxure all data is available
              if( this.props.callback !== undefined ){
                var state = this.state
                state.showSlideShow = true
                this.props.callback(state)
              }
            }}
            >
            Submit
          </Button>
        </Form>

        <SemanticModal
          visible={this.state.showSlideShow}
          onClose={() => {
            this.setState({showSlideShow:false})

            if( this.props.callback !== undefined ){
              var state = this.state
              state.showSlideShow = false
              this.props.callback(state)
            }
          }}
          children={
            <SlideShow
              key={`Slideshow-v${this.props.counter}`}
              {...this.props}
              disabled={this.props.disabled}
              ComponentArray={ComponentArray}
              />
          }
          />

      </div>


    )

  }
}
