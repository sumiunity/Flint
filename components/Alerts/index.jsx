
import React from 'react'

import { Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

/**
 * Renders an Alert using the material ui framework
 * @param       {string} props.position  position string (top-right, top-center, top-left, bottom-right...)
 * @param       {integer} props.timeout  timeout before the alert is hidden
 * @param       {string} props.severity Alert severity (success, info, warning, error )
 * @param       {string} props.title    Alert message title
 * @param       {string} props.message  string to render in the alert message
 * @constructor
 */
export function AlertComponent( props ){

  const [showAlert, setShowAlert] = React.useState(true)

  var position
  switch( props.position ){
    case 'top-right':
      position = {vertical: 'top', horizontal: 'right'}
      break

    case 'top-center':
      position = {vertical: 'top', horizontal: 'center'}
      break

    case 'top-left':
      position = {vertical: 'top', horizontal: 'left'}
      break

    case 'bottom-right':
      position = {vertical: 'bottom', horizontal: 'right'}
      break

    case 'bottom-center':
      position = {vertical: 'bottom', horizontal: 'center'}
      break

    case 'bottom-left':
      position = {vertical: 'bottom', horizontal: 'left'}
      break

    default :
      position = {vertical: 'bottom', horizontal: 'center'}
      break
  }

  var open = showAlert
  if( props.open !== undefined ) open = props.open

  return(
    <Snackbar
      open={open}
      autoHideDuration={(props.timeout === undefined) ? 2000 : props.timeout}
      anchorOrigin = {position}
      onClose={() => {
        setShowAlert(false);
        if( props.onClose !== undefined ) props.onClose()
      }}
      >

      <Alert
        onClose={() => {
          setShowAlert(false);
          if( props.onClose !== undefined ) props.onClose()
        }}
        severity={(props.severity === undefined) ? "success" : props.severity}>

        {(props.title !== undefined)
          ? <AlertTitle>{props.title}</AlertTitle>
          : null
        }

        {props.message}
      </Alert>

    </Snackbar>
  )

}

export default AlertComponent
