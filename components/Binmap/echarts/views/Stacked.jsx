/**
 * Stacked Modal
 * ==============
 *
 * Renders the stacked binmap showing information on all die
 *
 * @author Nik Sumikawa
 * @date Nov 12, 2020
 */


import React from 'react';

import jsonArray from '../../../../jsonArray/jsonArray'
import waferStruct from "../index"

import Slider from '../../../../Frameworks/MaterialUI/Slider'

/**
 * Renders a stacked wafer using the dynamic reports data
 * and the reference data pulled from the Cosolutions RestApi
 * @param       {Array} props.die_data data taken from the dynamic reports cache
 * @param       {Array} props.ref_struct reference data used to render the binmap
 * @param       {Array} props.wafer_num wafer number
 * @constructor
 */
export default function StackedBinmap( props ){

  const [sliderValue, setSliderValue] = React.useState([0, 100])


  var data = props.data
  if( !(data instanceof jsonArray)) data = new jsonArray(data)

  var wafer_struct = new waferStruct( {
    ref_struct: props.ref_struct,
    data: data
  })

  wafer_struct.data = wafer_struct.stack()

  // add the missing die locations
  var na = wafer_struct.fillna(wafer_struct.data, 'stacked', false)
  na = na.create_column('count', r => wafer_struct.wafers)
  na = na.create_column('ratio', r => 100)
  wafer_struct.data = new jsonArray(wafer_struct.data.concat(na))

  wafer_struct.color(
    'count',
    sliderValue[0],
    Math.floor(sliderValue[1]*wafer_struct.wafers/100)
  )

  var options = wafer_struct.plotOption(
    wafer_struct.data,
    { label:(props.label === undefined) ?  true : props.label,
      value: 'ratio'
    }
  )

  return(
    <div
      style={{
        margin:'auto',
        textAlign:'center',
        height: (props.height === undefined) ? '780px' : props.height,
        width: (props.width === undefined) ? '700px' : props.width,
      }}>

      <wafer_struct.data.react.echarts.Echarts
        key='DrBinmapModal'
        option = {options}
        echartsStyle={{
          height: (props.width === undefined) ? '700px' : props.width,
          width: (props.width === undefined) ? '700px' : props.width
        }}
        />

      {
        (props.slider === false ) ? null :
          <Slider
            {...props}
            key={'StackedSlider'}
            show={(props.slider === undefined) ? true : props.slider }
            value={sliderValue}
            maxValue={wafer_struct.wafers}
            callback={(value) => setSliderValue(value)}
            />
      }

    </div>
  )

}
