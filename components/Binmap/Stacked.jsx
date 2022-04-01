/*!
Stacked Binmap
===============

Layout components that generates Stacked a binmap given a gallery objects.

See widget.Binmap.jsx for the interface that connects with the REST API to
create a plug and play app that takes in a lot id and returns the binmap
lot Interface

:Author: Nik Sumikawa
:Date: Oct 7, 2019

*/



import React, {useState} from "react";



import WaferView, {EmptyWaferView} from './Wafer'
import {get_color} from './components/Colors'
import waferStruct from './components/waferStruct'

import SliderBar from '../../Frameworks/MaterialUI/SlideBar'
import jsonArray from '../../jsonArray/jsonArray'


// export function BinmapStackedDev(props){
//
//   const data = require('../diamond')
//
//   return(
//       <BinmapStackedView
//         gallery = {data}
//         labelEnable = {true}
//         refEnable = {false}
//         />
//     )
// }

/**
 * [shouldComponentUpdate description]
 * @param  {Array} outlineDie Array of Die locations to outline
 * @param  {Integer} sbin_num When provided will only show the specified Soft bin number
 * @param  {Integer} hbin_num When provided will only show the specified Hard bin number
 * @param  {Integer} bin      When provided will only show the specified bin number
 * @param  {String} bin_type  bin_type i.e. hbin_num or sbin_num
 * @param  {Boolean} sliderDieCount When True, the slider shows the die count. Slider defaults
 *                                  to the percentage
 * @return {[type]}           [description]
 */
export function BinmapStackedView( props ) {

  const [sliderValue, setSliderValue] = useState()

  if( props.gallery === undefined ) return <EmptyWaferView />

  console.log( 'WARN: Fix to use StackedView')
  var stacked = gallery_to_stacked( props, sliderValue )

  // when proviced, ensure that there are not redundant otulined die
  var outlineDie
  if( props.outlineDie !== undefined ){
    outlineDie = new jsonArray( props.outlineDie )
    outlineDie = outlineDie.drop_duplicates()
  }

  return (
    <div style={{padding: '5px'}}>

      <WaferView
        {...props}
        wafer_struct={stacked}
        refEnable={false}
        outlineDie={outlineDie}
        labelEnable={props.labelEnable === true ? true : false }
        bin_type={props.bin_type === 'count' ? 'HBIN_NUM' : 'SBIN_NUM' }

        x_att = {'ECIDX'}
        y_att = {'ECIDY'}
        ucs = {true}
        />

      <SliderBar
        key={'StackedSlider'}
        dieCount={props.sliderDieCount}
        maxValue={stacked.wafer}
        callback={(value) => setSliderValue(value)}
        />

    </div>
  );

}



/**
 * Renders the stacked binmap with a slider bar to adjust the color.
 *
 * NOTE: this assumes that the data is provided as a wafer structure object.
 * @param  {Array} outlineDie Array of Die locations to outline
 * @param  {Integer} sbin_num When provided will only show the specified Soft bin number
 * @param  {Integer} hbin_num When provided will only show the specified Hard bin number
 * @param  {Integer} bin      When provided will only show the specified bin number
 * @param  {String} bin_type  bin_type i.e. hbin_num or sbin_num
 * @param  {Boolean} sliderDieCount When True, the slider shows the die count. Slider defaults
 *                                  to the percentage
 * @return {[type]}           [description]
 */
export function StackedView( props ) {

  const [sliderValue, setSliderValue] = useState(props.wafer_struct.total)

  if( props.wafer_struct === undefined ) return <EmptyWaferView />

  // post a error when invalid data is provided
  if( !(props.wafer_struct instanceof waferStruct) ){
    return <div>Stacked binmap requires a wafer struct object as an input</div>
  }

  var wafer_struct = props.wafer_struct

  var colorPalette = 'stoplight'
  if( props.color !== undefined ) colorPalette = props.color

  // set the color based on the slider value
  wafer_struct.color('count', 0, sliderValue, colorPalette)

  // when proviced, ensure that there are not redundant otulined die
  var outlineDie
  if( props.outlineDie !== undefined ){
    outlineDie = new jsonArray( props.outlineDie )
    outlineDie = outlineDie.drop_duplicates()
  }

  return (
    <div style={{padding: '30px'}}>

      <WaferView
        {...props}
        wafer_struct={wafer_struct}
        outlineDie={outlineDie}
        rtclEnable = {true}
        labelEnable={props.labelEnable === true ? true : false }
        />

      <SliderBar
        key={'StackedSlider'}
        dieCount={props.sliderDieCount}
        maxValue={props.wafer_struct.total}
        callback={(value) => setSliderValue(value)}
        />

    </div>
  );

}

//
// /**
//  * [shouldComponentUpdate description]
//  * @param  {Array} outlineDie Array of Die locations to outline
//  * @param  {Integer} sbin_num When provided will only show the specified Soft bin number
//  * @param  {Integer} hbin_num When provided will only show the specified Hard bin number
//  * @param  {Integer} bin      When provided will only show the specified bin number
//  * @param  {String} bin_type  bin_type i.e. hbin_num or sbin_num
//  * @param  {Boolean} sliderDieCount When True, the slider shows the die count. Slider defaults
//  *                                  to the percentage
//  * @return {[type]}           [description]
//  */
// export default class BinmapStackedLayout extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//     this.state = { };
//   }
//
//
//   shouldComponentUpdate(nextProps, nextState){
//
//     const updateComponent =
//       this.componentUpdateStatus( this.props, nextProps ) |
//       this.componentUpdateStatus( this.state, nextState );
//
//     if(debug) console.log( 'stacked changes', updateComponent )
//     return updateComponent
//
//   }
//
//   /**
//    * compare the previous and next state. Return True when there is a change
//    * @param  {object} prev object containing the prev set of parameters (props or state)
//    * @param  {object} next object containing the next set of parameters (props or state)
//    * @return {Boolean}           True when there was a change, otherwise false
//    */
//   componentUpdateStatus( prev, next ){
//
//     const keys = Object.keys(next)
//
//     for( var i=0; i < keys.length; i++ ){
//
//       const key = keys[i]
//
//       // list of keys to ignore
//       if( key === 'onClick' ) continue
//
//       // check the lot names instead of the full object when performing
//       // the comparison
//       if((key === 'gallery')|(key === 'binmap') ){
//         if( next[key] === undefined ) continue
//         if((prev[key] === undefined)&(next[key] !== undefined)) return true
//         if(prev[key].data.length !== next[key].data.length) return true
//         if(prev[key].data[0].wplot !== next[key].data[0].wplot) return true
//         continue
//       }
//
//       // default condition, return true when there was a change
//       if( prev[key] !== next[key] ){
//         if(debug) console.log( `change in props ${key}`, prev[key], next[key])
//         return true
//       }
//     }
//
//     return false
//   }
//
//   render() {
//
//     return (
//       <BinmapStackedView
//         {...this.props}
//         gallery = {this.props.gallery}
//         />
//     )
//   }
// }
//
//
//
//
function gallery_to_stacked( props, slider_value ){
  // loops through each wafer and failing die and performs the various
  // functions (i.e. stacked, pareto, etc) based on the enables


  const bin_att = (props.bin_att === undefined) ? 'HBIN_NUM' : props.bin_att
  const x_att = (props.x_att === undefined) ? 'ECIDX' : props.x_att
  const y_att = (props.y_att === undefined) ? 'ECIDY' : props.y_att

  const chart = props.gallery[0].chart
  const ref = chart.reference


  // select a reference wafer from the provided gallery
  var die_x = ref.map(die => die[x_att])
  var x, y

  const x_min = Math.min.apply(null, die_x)
  const x_max = Math.max.apply(null, die_x)
  const y_min = Math.min.apply(null, ref.map(die => die.min))
  const y_max = Math.max.apply(null, ref.map(die => die.max))
  const x_range = x_max - x_min + 1
  const y_range = y_max - y_min + 1
  const wafers = props.gallery.length

  // create a ndarray to hold the number of failing die at each die location
  var stacked_array = Array(y_range).fill().map(()=>Array(x_range).fill(0));


  //loop through each wafer in the binmap gallery
  for( var wafer = 0; wafer < props.gallery.length; wafer++ ){

    var data = props.gallery[wafer].chart.data

    // filter the data based on a given bin when provied
    if( props.bin !== undefined ){
      data = data.filter( row => row[bin_att] === props.bin )
    }

    //loop through each failing die location in the wafer
    for( var die_num=0; die_num < data.length; die_num++ ){

      //remove the minimum value offset for each axis
      x = data[die_num][x_att] - x_min
      y = data[die_num][y_att] - y_min

      //update the stacked array
      try {
        stacked_array[y][x]++
      } catch {
          console.log( `outlier die ${x}-${y}`)
      }

    }
  }


  var formatted_data = []

  var color_limit = wafers
  if( slider_value !== undefined ) color_limit = slider_value

  // count the number of failing die at each die location
  for( var i=0; i < ref.length; i++ ){

    const ref_die = ref[i]


    for( var die_y = ref_die.min; die_y < ref_die.max+1; die_y++ ){

      x = ref_die[x_att] - x_min
      y = die_y - y_min
      var stacked_val = stacked_array[y][x]

      // invert the scale to count the number of passing samples
      if( props.invert !== false ) stacked_val = wafers - stacked_val

      formatted_data.push({
        [x_att]: ref_die[x_att],
        [y_att]: die_y,
        SBIN_NUM: stacked_val,
        HBIN_NUM: Math.floor(100*stacked_val/wafers),
        TEST_NUM: stacked_val,
        color: get_color(stacked_val, 'stoplight', 0, color_limit)
        })

    }
  }


  // format the stacked wafer as a binmap data structure
  return {
    'chart': {
      'index': [],
      'data': formatted_data,
      'reference': ref,
      'columns': [],
      'reticle': chart.reticle,
      'ucs_params': chart.ucs_params,
    },

    'format': {'y_axis': false, 'x_axis': false},
    'wafer': wafers,
    'lot': 'STACKED',
    'error': false
  }

}
