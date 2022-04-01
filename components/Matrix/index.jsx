
import React from 'react';
import _ from 'lodash'

import { Grid } from 'semantic-ui-react'

import Row from './Row'




export default class Matrix extends React.Component{

  constructor(props) {
    super(props);
    this.state = {selected: (props.selected === undefined ? [] : props.selected)}
  }

  shouldComponentUpdate( nextProps, nextState ){
    // update the selected cells when changed from the parent
    if(this.props.selected !== nextProps.selected) this.setState({selected: nextProps.selected})
    return true
  }

  render(){
    // const [selected, setSelected] = React.useState((props.selected === undefined) ? [] : props.selected)
    var name = `Matrix-${_.uniqueId()}`

    var GridComponent = []

    var columns = 5
    if( this.props.columns !== undefined ) columns = this.props.columns

    // compute the total number of rows based on the given column size
    const rows = Math.ceil( this.props.data.length / columns )

    for( var row=0; row < rows; row++ ){

      // add the row to the grid component
      GridComponent.push(
        <Row
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

    console.log( 'what are the selected', this.state.selected)
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
