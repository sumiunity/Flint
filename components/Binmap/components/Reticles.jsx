/**
 * Binmap Chart Components
 * ========================
 * Components used when generating the Binmap plots
 *
 * Author : Nik Sumikawa and Matt Nero
 * Date : Aug 21, 2019
 */

import React from 'react';

// import toUCS, {fromUCS} from './UCS'
import toUCS from './UCS'


export default function Reticles( props ) {

  if( props.visible === false ) return null
  if( props.wafer_struct.chart.reticle === undefined ) return null


  // set a default attribute name when none is provided as props
  const x_att = (props.x_att === undefined) ? 'ECIDX' : props.x_att
  const y_att = (props.y_att === undefined) ? 'ECIDY' : props.y_att


  const OFFSET = 2

  const format = props.wafer_struct.format
  const reticle = props.wafer_struct.chart.reticle

  const coordinates = toUCS(
    reticle[x_att],
    reticle[y_att],
    props.wafer_struct.chart.ucs_params,
    true)

  var rtcl_width = reticle.width
  var rtcl_height =  reticle.height
  if( props.wafer_struct.chart.ucs_params.xy_swap === true ){
    rtcl_width = reticle.height
    rtcl_height =  reticle.width
  }


  const x_shift = (coordinates.x % rtcl_width)
  const y_shift = (coordinates.y % rtcl_height)

  // var ecid
  var reticle_lines = [];

  for (var i=format.x_range[0]; i < format.x_range[1] + 1; i++) {
    if( ((i - x_shift) % rtcl_width) === 0){
      //
      // ecid = fromUCS( i , 0, props.wafer_struct.chart.ucs_params )
      //
      // var ref_x = props.wafer_struct.chart.reference.filter(r =>
      //   (r.ECIDX === ecid.x) | (r.ECIDX === ecid.x+1)
      // )
      //
      // var min_x = Math.min(...ref_x.map(r=>r.min)) - 1
      // var max_x = Math.max(...ref_x.map(r=>r.max))
      //
      // format.height * (min_x - 0.5 + OFFSET)
      // format.height * (max_x - 0.5 + OFFSET)
      //
      var x = format.width * (i - format.x_range[0] - 0.5 + OFFSET)
      reticle_lines.push(
        <line
          key = {"reticle_x" + i}
          x1 = {x}
          x2 = {x}
          y1 = {0}
          y2 = {format.diameter}
          style={{
            stroke: "black",
            strokeWidth: "2px"}}/>
      )
    }
  }

  for ( i=format.y_range[0]; i < format.y_range[1] + 1; i++) {
    if( ((i - y_shift) % rtcl_height) === 0){
      // ecid = fromUCS( 0 , i, props.wafer_struct.chart.ucs_params )
      //
      // var ref_y = props.wafer_struct.chart.reference.filter(r =>
      //   (r.max === ecid.y) | (r.max === ecid.y+1) |
      //   (r.min === ecid.y) | (r.min === ecid.y+1)
      // )
      //
      // var min_y = Math.min(...ref_y.map(r=>r.ECIDX)) - 1
      // var max_y = Math.max(...ref_y.map(r=>r.ECIDX))

      var y = format.height * (i - format.y_range[0] - 0.5 + OFFSET)
      // format.width * (min_y - 0.5 + OFFSET)
      // console.log( y, min_y, max_y)
        reticle_lines.push(
          <line
            key = {"reticle_y" + i}
            x1 = {0}
            x2 = {format.diameter}
            y1 = {y}
            y2 = {y}
            style={{stroke: "black", strokeWidth: "2px"}}/>
        )
    }
  }

  // if( debug ){
  // console.log( coordinates )
  // console.log( format.x_range )
  // console.log( format.y_range )
  // console.log( rtcl_width )
  // console.log( rtcl_height )
  // console.log( x_shift )
  // console.log( y_shift )
  // // }
  //

  return (
    <React.Fragment>
      <clipPath id="clip_to_wafer">
        <circle
          cx= {format.diameter/2}
          cy= {format.diameter/2}
          r={(format.diameter - 40)/2} >
        </circle>

      </clipPath>
      <g clipPath="url(#clip_to_wafer)">
        {reticle_lines}
      </g>
    </React.Fragment>
  )
}
