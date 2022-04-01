/**
 * Image Matrix
 * ================
 *
 * Generates a N x M matrix of images with the lazy loading capabilities
 *
 * @author Nik Sumikawa
 * @date Nov 6, 2020
*/



import React from 'react';
import _ from 'lodash'

import { Grid } from 'semantic-ui-react'

import ImageRow from './ImageRow'




export default class ImageMatrix extends React.Component{

  constructor(props) {
    super(props);
    this.state = {selected: (props.selected === undefined ? [] : props.selected)}
  }

  shouldComponentUpdate( nextProps, nextState ){
    return true
  }

  render(){
    // const [selected, setSelected] = React.useState((props.selected === undefined) ? [] : props.selected)
    var name = `ImageMatrix-${_.uniqueId()}`

    var GridComponent = []

    var columns = 5
    if( this.props.columns !== undefined ) columns = this.props.columns

    // compute the total number of rows based on the given column size
    const rows = Math.ceil( this.props.images.length / columns )

    for( var row=0; row < rows; row++ ){

      // add the row to the grid component
      GridComponent.push(
        <ImageRow
          {...this.props}
          key = {`${name}-${row}-${_.uniqueId()}`}
          name= {name}
          row = {row}
          columns = {columns}
          selected = {this.state.selected}
          setSelected = {(val) => this.setState({selected: val})}
          />
      )
    }

    // return a grid of wafer thumbnails
    return(
      <Grid
        key = {`${name}-Grid`}
        style={{...this.props.gridStyle,...{margin:0}}}
        celled
        columns={columns}
        >
        {GridComponent}
      </Grid>
    )
  }

}
