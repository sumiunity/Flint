/**
 * Image Row
 * ================
 *
 * Renders a Row of images. By Default
 *
 * @author Nik Sumikawa
 * @date Nov 6, 2020
*/



import React from 'react';
import { Grid } from 'semantic-ui-react'


import ImageCell from './ImageCell'

/**
 * Renders a row of images
 * @param       {integer} props.columns number of columns in the row
 * @param       {integer} props.row row number
 * @param       {Array} props.images array of image urls
 * @constructor
 */
export default function ImageRow( props ){

  var columns = 5
  if( props.columns !== undefined ) columns = props.columns

  // populate the row component with thumbnails for each wafer (column)
  var RowComponent = []
  for( var col=0; col < columns; col++ ){

    const image_id = props.row*columns + col

    RowComponent.push(
      <ImageCell
        {...props}
        key = {`${props.name}-${props.row}-${col}`}
        col = {col}
        image_id = {image_id}
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
