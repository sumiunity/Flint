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
import { Grid, Header, Divider } from 'semantic-ui-react'


// import _ from 'lodash'

export default function Cell( props ){

  if( props.data.length <= props.cell_id )  return null

  // set defaults
  var child, title, footer

  // overwrite the defaults when the data is provided as an object
  const keys = Object.keys(props.data[props.cell_id])
  if( keys.includes('child') ) child = props.data[props.cell_id]['child']
  if( keys.includes('title') ) title = props.data[props.cell_id]['title']
  if( keys.includes('footer') ) footer = props.data[props.cell_id]['footer']

  // format the callback function when provided. default to a console lot
  var callback = (selected, value) => console.log( 'cellOnClick', value)
  if( props.cellOnClick !== undefined ){

    callback = (selected, val) => props.cellOnClick({
      id: props.cell_id,
      row: props.row,
      col: props.col,
      data: props.data[props.cell_id],
      selected: selected
    })
  }

  // define the onclick functionality that includes the callback
  // and the selection criteria
  var onClick = (val) => {
    // callback(val)

    var selected = props.selected
    if( (props.setSelected !== undefined)&(props.selectable === true) ){

      if( props.selected.includes(props.cell_id) ){
        selected.splice(selected.indexOf(props.cell_id), 1)
      }else{
        selected = selected.concat([props.cell_id])
      }

      callback(selected, val)
      props.setSelected( selected, val )

    }else{
      callback([], val)
    }
  }

  var overlay = imageOverlay( props, onClick )
  const ostyle = outlineStyle( props )
  const bgstyle = backgroundStyle( props )

  // define the background based on the input
  var selStyle = {}
  if( props.selected !== undefined ){
    if( props.selected.includes(props.cell_id)) selStyle['backgroundColor'] = 'yellow'

    // overwrite the default coloring
    if( (props.selected.includes(props.cell_id))&(props.selectableColor !== undefined)){
      selStyle['backgroundColor']=props.selectableColor
    }

    // overwrite the coloring with an image overlay
    if( (props.selected.includes(props.cell_id))&(props.selectableOverlay !== undefined)){
      overlay = overlayComponent(props.selectableOverlay, onClick)
    }
  }


  return(
    <Grid.Column
      key = {`Matrix-cell-${props.cell_id}`}
      verticalAlign = 'middle'
      textAlign= 'center'
      style = {{
        ...{
          textAlign: 'center',
          padding: '5px',
          height: '100%',
        },
        ...props.gridStyle,
        ...props.cellStyle,
        ...bgstyle,
        ...selStyle,
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

      <div onClick={onClick}>
        {child}
      </div>

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



function backgroundStyle( props ){
  // define the background color style based on the input
  var style = {}

  if( props.background !== undefined ){

    if( props.background.includes(props.cell_id) ){
      style = { backgroundColor: 'red' }

      if( props.backgroundColor !== undefined ) style['backgroundColor'] = props.backgroundColor
    }
  }
  return style
}


function outlineStyle( props ){
  // define the outline style based on the input
  var ostyle = {}

  if( props.outline !== undefined ){

    var temp = props.outline.filter(r => r.id === props.cell_id)

    if( temp.length > 0 ){
      ostyle = {
        border: '5px solid',
        borderColor: temp[0].color,
        padding: '0',
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

    var temp = props.overlayComponent.filter(r => r.id === props.cell_id)

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
