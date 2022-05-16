
import React from "react";

import { Modal } from 'semantic-ui-react'


/**
 * Modal used for forms. This allows for positioning and styling
 * @param       {String} props.position  location to render modal
 * @param       {String} props.width     modal width
 * @param       {String} props.header    String added to the modal header
 * @param       {String} props.headerComponent Component rendered in the modal header
 * @constructor
 */
export default function FormModal( props ){

  var header = null
  if( props.header !== undefined ){
    header = (<Modal.Header content={props.header} />)
  }

  if( props.headerComponent !== undefined ){
      header = (<Modal.Header>{props.headerComponent}</Modal.Header> )
  }

  var feedback = undefined
  if( props.actionCallback !== undefined ){
    feedback = (<Modal.Header {...props} />)
  }

  // create a default style when none is provided
  var modalContentStyle = {...props.style}

  var defaultStyle = {
    width: '300px',
    maxHeight: '95vh',
    minHeight: '200px',
    overflowY: 'auto',
    overflowX: 'hidden'
  }

  switch( props.position ){
    case 'top-left':
      defaultStyle['position'] = 'absolute'
      defaultStyle['top'] = '50px'
      defaultStyle['left'] = '50px'
      break

    case 'top-right':
      defaultStyle['position'] = 'absolute'
      defaultStyle['top'] = '50px'
      defaultStyle['right'] = '50px'
      break

    case 'top-center':
      defaultStyle['position'] = 'absolute'
      defaultStyle['top'] = '50px'
      break

    case 'center-left':
      defaultStyle['position'] = 'absolute'
      defaultStyle['left'] = '50px'
      break

    case 'center-right':
      defaultStyle['position'] = 'absolute'
      defaultStyle['right'] = '50px'
      break


    case 'bottom-left':
      defaultStyle['position'] = 'absolute'
      defaultStyle['bottom'] = '50px'
      defaultStyle['left'] = '50px'
      break

    case 'bottom-right':
      defaultStyle['position'] = 'absolute'
      defaultStyle['bottom'] = '50px'
      defaultStyle['right'] = '50px'
      break

    case 'bottom-center':
      defaultStyle['position'] = 'absolute'
      defaultStyle['bottom'] = '50px'
      break

    default:
      console.log( 'nothing required to place the modal in the center')
      break
  }

  if( props.width !== undefined) defaultStyle['width'] = props.width

  return (

    <Modal
      closeIcon={true}
      open={props.visible}
      onClose={() => (props.onClose === undefined) ? null : props.onClose()}
      dimmer='inverted'
      style = {{...defaultStyle,
        ...props.modalStyle
        }}
      >

      {header}

      <Modal.Content style={modalContentStyle}>
        {props.children}
      </Modal.Content>

      {feedback}

   </Modal>

  )
}
