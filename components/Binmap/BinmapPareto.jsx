/**
 * Binmap Pareto
 * ================
 *
 * Binmap Pareto Table containing the color, bin number and
 * average yield loss per bin. The data can be extracted from
 * the binmap gallery or a bin pareto.
 *
 * :Author: Nik Sumikawa
 * :Date: May 12, 2020
 */

import React from 'react';


import jsonArray from '../../jsonArray/jsonArray'
import {get_color} from './components/Colors'


export function BinmapParetoDev( props ){

  const data = require('../diamond')

  return(
    <BinmapParetoView
      gallery={data}
      onClick={(val) => console.log( 'onclick', val)}
      />
  )
}

export function BinmapParetoView( props ){

  var binType = 'HBIN_NUM'
  if( props.bin_type !== undefined ) binType = props.bin_type

  // extract an array of all die in the binmap gallery
  const die_array = props.gallery.map(r => r.chart.data).flat()
  // console.log( die_array)

  const total = die_array.length

  // create a DataFrame with the die array data
  const json_array = new jsonArray(die_array)

  // groupby the bin type to create a fail pareto
  var groups = json_array.groupby([binType])
  groups = groups.apply( 'count', (val) => val/total, 'YIELD')
  groups = groups.apply( binType, (val) => get_color(val), 'COLOR')

  groups.dtypes['YIELD'] = 'percentage'
  groups.dtypes['COLOR'] = 'hexcolor'

  // define the format of the accordian dropdown table
  const accordianFunc = (accordianTable) => {
    var subgroup = accordianTable.groupby(['LAST_FAILED_TEST_NUM'])
    subgroup = subgroup.apply( 'count', (val) => val/total, 'YIELD')
    subgroup.dtypes['YIELD'] = 'percentage'
    return subgroup
  }

  var onClick
  if( props.onClick !== undefined ){
    onClick = (value) => props.onClick(value)
  }

  // barChartEnable={true}
  // bin = {bin_data}
  return(
      <groups.react.semanticUI.Table
        {...props}
        tableName={'BinParetoTable'}
        bodyStyle={{padding:0, margin:0}}
        sortable={true}
        accordian={true}
        accordianHeader={false}
        accordianFunc = {accordianFunc}
        accordianColumns = {['LAST_FAILED_TEST_NUM', 'count', 'YIELD']}
        rowOnClick = {onClick}
        tdStyle={{margin: 0, padding:0, height:'15px'}}
        columns={[
          'COLOR',
          binType,
          'YIELD',
        ]}

        />
  )
}
// rowOnClick = {(value) => {
//   setModalData(value.row_data)
//   setShowModal(true)
//   console.log( value.row_data)
//   }}
