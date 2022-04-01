/**
 * Image Group
 * ================
 *
 * Groups Images based on a column name, where each value is used for the split
 *
 * @author Nik Sumikawa
 * @date Dec 11, 2020
*/


import React from 'react';

import { Grid, Header } from 'semantic-ui-react'

import jsonArray from '../../../../components/jsonArray/jsonArray'
import ImageMatrix from './index'


export default function Group( props ){

  const col = "PRE_EQP_CH_SEQ"

  // ensure the data is of jsonArray format
  var json_array = props.data
  if( !(json_array instanceof jsonArray) ){
    json_array = new jsonArray(json_array)
  }

  // group the images based on the provided column
  const groups = json_array.groupby([props.col])

  var image_groups = []
  for( var i=0; i < groups.length; i++ ){
    const group_name = groups[i][col]

    var group = new jsonArray(groups[i].json_obj)
    group = group.reset_index()

    const images = group.map(r=>r.image)
    const selected = group.filter(r => r.selected === true).map(r=>r.__index__)


    image_groups.push(
      <Grid.Row
        key = {`image group - row - ${i}`}
        style={{padding:0, margin:'10px 0 0 0'}}>
        <Grid.Column
          key = {`image group - col1 - ${i}`}
          verticalAlign='middle'
          width={3}
          >
          <Header as='h4'
            key = {`image group - header - ${i}`}
            >{group_name}
          </Header>
        </Grid.Column>

        <Grid.Column
          key = {`image group - col2 - ${i}`}
          width={13}
          style={{padding:0, margin:0}}>
          <ImageMatrix
            {...props}
            key = {`imageMatrix-${group_name}- ${i}`}
            images={images}
            selected={selected}
            columns={(props.columnCount === undefined) ? 8 : props.columnCount}
            />
        </Grid.Column>
      </Grid.Row>
    )
  }

  return (
    <Grid>
      {image_groups}
    </Grid>
  )
}
