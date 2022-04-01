/**
 * Wafer Modal
 * ==============
 *
 * Renders the wafermap showing information on all die
 *
 * @author Nik Sumikawa
 * @date Nov 12, 2020
 */


import React from 'react';

import jsonArray from '../../../../jsonArray/jsonArray'
import waferStruct from "../index"


/**
 * Renders a single wafer using the dynamic reports data
 * and the reference data pulled from the Cosolutions RestApi
 * @param       {Array} props.die_data data taken from the dynamic reports cache
 * @param       {Array} props.ref_struct reference data used to render the binmap
 * @param       {Array} props.wafer_num wafer number
 * @constructor
 */
export default function Binmap( props ){


  var data = props.data
  if( !(data instanceof jsonArray)) data = new jsonArray(data)

  var wafer_struct = new waferStruct( {
    ref_struct: props.ref_struct,
    data: data
  })

  if( props.drYield !== undefined ){
    wafer_struct.joinBinData( props.drYield.bins )
  }

  // add the missing die locations
  if( props.showPassing !== false ){
    var na = wafer_struct.fillna(wafer_struct.data, 'passing', false )
    na = na.create_column('color', r => '#FFFFFF')
    na = na.create_column('VALUE', r => ' ')
    wafer_struct.data =  wafer_struct.data.concat(na)
  }

  return(
    <div
      style={{
        margin:'auto'
      }}>
      <wafer_struct.data.react.echarts.Echarts
        key='DrBinmap'
        option = {wafer_struct.plotOption(
          wafer_struct.data,
          {label:(props.label === undefined) ?  true : props.label}
        )}
        echartsStyle={{
          height: (props.height === undefined) ? '700px' : props.height,
          width: (props.width === undefined) ? '700px' : props.width
        }}
        />
    </div>
  )
}
