/**
 * Wafer API
 * =========
 *
 * Routine used to generate the wafer map plot
 *
 * :Author: Nik Sumikawa
 *
 */

import React from 'react';

import waferStruct from './components/waferStruct'
import WaferCircle from './components/WaferCircle'
import Reticles from './components/Reticles'
import { Axis } from './components/Axis'
import {
  WaferDies,
  ReferenceDie,
  OutlineDie,
} from './components/Die'



// export function WaferDev(props){
//
//   const data = require('../diamond')[0]
//
//   return(
//       <WaferView
//         wafer_struct = {data}
//         labelEnable = {true}
//         refEnable = {true}
//         />
//     )
// }

/**
 * [Wafer description]
 * @param       {Object}  props.wafer_struct json object containing binmap data
 * @param       {Boolean} tooltipEnable When True, shows tool tips on hover
 * @param       {Boolean} props.refEnable When True, shows reference die locations
 * @param       {Boolean} props.rtclEnable When True, shows rtcl lines
 * @param       {Boolean} labelEnable When True, shows label for all failing die
 * @param       {Boolean} props.x_att name of the die x attribute
 * @param       {Boolean} props.y_att name of the die y attribute
 * @param       {Boolean} props.bin_att name of the bin attribute
 * @constructor
 */
export function WaferView(props) {


  var container = 0
  if( props.container !== null ){ container = props.container }

  // do not perform processing when no data is provided
  if( props.wafer_struct === undefined ){
    return(
      <EmptyWaferView
        {...props}
        container={container}
        />
    )
  }

  // var wafer_struct = new BinmapPlotStruct(props.wafer_struct, props.ucs_enable)
  var wafer_struct = props.wafer_struct
  if( !(wafer_struct instanceof waferStruct) ){
    wafer_struct = new waferStruct(wafer_struct)
  }

  // do not perform processing when no data is provided
  if( wafer_struct.error){
    return(
      <EmptyWaferView
        {...props}
        container={container}
        />
    )
  }

  //add the onclick fundtion. Default to do nothing when the function does not exist
  var onClick
  if( props.onClick !== undefined ){
    onClick = () => props.onClick({
      container: props.container,
      wafer_struct: props.wafer_struct
      })
  }


  // console.log( 'what is the bin _type', props.bin_type )
  return (
      <svg
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0, 0, ${wafer_struct.format.diameter}, ${wafer_struct.format.diameter}`}
        transform="scale(1, -1)"
        style={{
          display: "inline-block",
          width: "100%",
          overflow: "visible",
          }}
        >

        <WaferCircle
          onClick={onClick}
          wafer_struct={wafer_struct}
          />

        <ReferenceDie
          visible = {props.refEnable}
          wafer_struct={wafer_struct}
          container={container}
          labelEnable={false}/>

        <WaferDies
          {...props}
          wafer_struct={wafer_struct}
          container={container}
          />


        <OutlineDie
          {...props}
          wafer_struct={wafer_struct}
          container={container}
          />

        <Reticles
          wafer_struct={wafer_struct}
          visible={props.rtclEnable}
          />

        <Axis
          visible = {false}
          wafer_struct={wafer_struct}
          />

      </svg>
  );
}


// Returns an blank circle representing an empty wafer. This
// is useful when an error occurs and we don't want to render
// an empty cell
export function EmptyWaferView(props){

  //add the onclick fundtion. Default to do nothing when the function does not exist
  var onClick
  if( props.onClick !== undefined ){
    onClick = () => props.onClick({
      container: props.container,
      wafer_struct: props.wafer_struct
      })
  }

  return(
    <svg
      preserveAspectRatio="xMinYMin meet"
       viewBox="0, 0, 1000, 1000"
       transform="scale(1, -1)"
       style={{
         display: "inline-block",
         width: "100%",
         overflow: "visible",
       }}
    >

      <WaferCircle onClick={onClick}/>
    </svg>
  )
}

export default WaferView
