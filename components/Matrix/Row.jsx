

import React from 'react';
import { Grid } from 'semantic-ui-react'

import Cell from './Cell'

export default function Row( props ){

  var columns = 5
  if( props.columns !== undefined ) columns = props.columns

  // populate the row component with thumbnails for each wafer (column)
  var RowComponent = []
  for( var col=0; col < columns; col++ ){

    const cell_id = props.row*columns + col

    RowComponent.push(
      <Cell
        {...props}
        key = {`${props.name}-${props.row}-${col}`}
        col = {col}
        cell_id = {cell_id}
        />
    )
  }

  return(
    <Grid.Row
      key = {`${props.name}-${props.row}-GridRow`}
      style = {{
        ...{padding: '0px'},
        ...props.gridStyle,
      }}
      >
      {RowComponent}
    </Grid.Row>
  )
}
