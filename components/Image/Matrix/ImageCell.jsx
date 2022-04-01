/**
 * Image Cell
 * ================
 *
 * Renders an Image Cell within the image matrix. All cell
 * customizations are performed here including titles and
 * other overlays
 *
 * @author Nik Sumikawa
 * @date Nov 6, 2020
*/


import React from 'react';
import { Grid, Image, Header, Divider } from 'semantic-ui-react'


// import _ from 'lodash'

export default function ImageCell( props ){

  if( props.images.length <= props.image_id )  return null

  // set defaults
  var image = props.images[props.image_id]
  var title
  var footer

  // overwrite the defaults when the data is provided as an object
  const keys = Object.keys(props.images[props.image_id])
  if( keys.includes('image') ) image = props.images[props.image_id]['image']
  if( keys.includes('title') ) title = props.images[props.image_id]['title']
  if( keys.includes('footer') ) footer = props.images[props.image_id]['footer']

  // format the callback function when provided. default to a console lot
  var callback = (selected, value) => console.log( 'cellOnClick', value)
  if( props.cellOnClick !== undefined ){
    // create values for callback
    const row_id = props.row
    const col_id = props.col

    callback = (selected, val) => props.cellOnClick({
      row: row_id,
      col: col_id,
      url: image,
      data: props.images[props.image_id],
      id: props.image_id,
      selected: selected
    })
  }

  // define the onclick functionality that includes the callback
  // and the selection criteria
  var onClick = (val) => {
    // callback(val)

    var selected = props.selected
    if( (props.setSelected !== undefined)&(props.selectable === true) ){

      if( props.selected.includes(props.image_id) ){
        selected.splice(selected.indexOf(props.image_id), 1)
      }else{
        selected = selected.concat([props.image_id])
      }

      callback(selected, val)
      props.setSelected( selected, val )

    }else{
      callback([], val)
    }
  }

  var overlay = imageOverlay( props, onClick )
  const ostyle = outlineStyle( props )

  // define the background based on the input
  var backgroundColor = 'none'
  if( props.selected !== undefined ){
    if( props.selected.includes(props.image_id)) backgroundColor='yellow'

    // overwrite the default coloring
    if( (props.selected.includes(props.image_id))&(props.selectableColor !== undefined)){
      backgroundColor=props.selectableColor
    }

    // overwrite the coloring with an image overlay
    if( (props.selected.includes(props.image_id))&(props.selectableOverlay !== undefined)){
      backgroundColor='none'
      overlay = overlayComponent(props.selectableOverlay, onClick)
    }
  }


  return(
    <Grid.Column
      key = {`Image-cell-${props.image_id}`}
      verticalAlign = 'middle'
      style = {{
        ...{
          textAlign: 'center',
          padding: '5px',
          height: '100%',
          backgroundColor: backgroundColor,
        },
        ...props.gridStyle,
        ...props.cellStyle,
        ...ostyle
      }}

      >

      {(title !== undefined)
        ?
          <>
          <Header style={{margin: '5px 0'}} as='h4'>{title}</Header>
          <Divider style={{margin: '5px 0'}}/>
          </>
        : null
      }

      {overlay}

      <ImageWrapper
        {...props}
        src={image}
        onClick = {onClick}
        />

      {(footer !== undefined)
        ?
          <>
          <Divider style={{margin: '5px 0'}}/>
          <Header style={{margin: '5px 0'}} as='h5'>{footer}</Header>
          </>
        : null
      }

    </Grid.Column>
  )
}



function ImageWrapper( props ){

  const [imageSrc, setImageSrc] = React.useState(props.src)

  var onError = () => console.log( 'image broken')
  if( props.onError !== undefined ) onError = () => setImageSrc( props.onError)

  return(
    <Image
      src={imageSrc}
      onClick = {props.onClick}
      onError = {onError}
      />
  )
}



function outlineStyle( props ){
  // define the outline style based on the input
  var ostyle = {}

  if( props.outline !== undefined ){

    var temp = props.outline.filter(r => r.id === props.image_id)

    if( temp.length > 0 ){
      ostyle = {
        border: '5px solid',
        borderColor: temp[0].color
      }

      if( temp[0].color !== undefined ) ostyle.borderColor = temp[0].color
    }
  }

  // console.log( ostyle, props.outline  )
  return ostyle
}


function imageOverlay( props, onClick ){
  // define the outline style based on the input
  var overlay

  if( props.overlayComponent !== undefined ){

    var temp = props.overlayComponent.filter(r => r.id === props.image_id)

    if( temp.length > 0 ){
      overlay = overlayComponent(temp[0].Component, onClick)
    }
  }

  // console.log( ostyle, props.outline  )
  return overlay
}

function overlayComponent( Component, onClick ){
  return(
      <div
        onClick={onClick}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, .6)',
          zIndex: 10,
          }}>
        {Component}
      </div>
  )
}
