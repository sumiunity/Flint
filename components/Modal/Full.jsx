
import React from "react";

import { Modal, Button } from 'semantic-ui-react'



/**
 * Modal Rendered across the entire Screen
 * @param       {String} props.open      When true, the modal is shown
 * @param       {String} props.header    String added to the modal header
 * @param       {String} props.headerComponent Component rendered in the modal header
 * @constructor
 */
export default function FullScreen( props ){

  if( props.visible !== true ) return null

  var header = null
  if( props.header !== undefined ){
    header = (<Modal.Header content={props.header} />)
  }

  if( props.headerComponent !== undefined ){
      header = (<Modal.Header>{props.headerComponent}</Modal.Header> )
  }

  // create a default style when none is provided
  var modalContentStyle = {
    ...{
      overflowY: 'auto',
      height: '100vh',
      margin:0,
      padding:0,
    },
    ...props.style
  }


  return (
    <div className='ui page modals dimmer transition visible active'
      style = {{
        ...{
          margin:0,
          padding:0,
          height: '100vh',
          width: '100vw',
        },
        ...props.modalStyle
      }}
    >
      <div className='ui scrolling modal transition visible active'
      style = {{
          margin:0,
          padding:0,
          height: '100vh',
          width: '100vw',
        }}
      >

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


      {header}

      <Modal.Content style={modalContentStyle}>
        {props.children}
      </Modal.Content>


      </div>
    </div>

  )

}
