import React from "react";

import { Modal, Button } from 'semantic-ui-react'


export default function SemanticModal( props ){

  const CloseButton = (
    <Button
      circular
      color='google plus'
      icon='cancel'
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex:1000,
      }}
      onClick={props.onClose}
      />
  )

  var header = null
  if( props.header !== undefined ){
    header = (
      <Modal.Header>
        {props.header}
        {CloseButton}
      </Modal.Header>)
  }

  if( props.headerComponent !== undefined ){
      header = (
        <Modal.Header>
          {props.headerComponent}
          {CloseButton}
        </Modal.Header> )
  }

  var feedback = undefined
  if( props.actionCallback !== undefined ){
    feedback = (<Modal.Header {...props} />)
  }

  // create a default style when none is provided
  var modalContentStyle = {
    ...{overflowY: 'auto',
        maxHeight: '85vh'
    },
    ...props.style
  }


  return (

    <Modal
      open={props.visible}
      onClose={() => (props.onClose === undefined) ? null : props.onClose()}
      dimmer='inverted'
      style = {{...{
        marginTop: '5vh',
        marginLeft: '5vw',
        width: '90vw',
        // inset: 'auto',
        // width: 'auto',
        // overflowY: 'auto',
        height:'auto',
        minHeight: '40vh',
        },
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
