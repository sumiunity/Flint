/**
 * Binmap Chart Components
 * ========================
 * Components used when generating the Binmap plots
 *
 * Author : Nik Sumikawa and Matt Nero
 * Date : Aug 21, 2019
 */

import React from 'react';

import {get_color, convertHex} from './Colors'
import toUCS from './UCS'



export function Die(props) {

  // set a default attribute name when none is provided as props
  const bin_att = (props.bin_att === undefined) ? 'HBIN_NUM' : props.bin_att
  const x_att = (props.x_att === undefined) ? 'DIEX' : props.x_att
  const y_att = (props.y_att === undefined) ? 'DIEY' : props.y_att

  const style = dieStyle( props, bin_att )

  var die_x = props.die[x_att]
  var die_y = props.die[y_att]

  // when specified in the props, convert the coordinates to UCS
  // This is not needed if the data is already mapped into UCS
  if( props.ucs === true ){
    const coordinates = toUCS(
      die_x,
      die_y,
      props.wafer_struct.chart.ucs_params,
      true )

    die_x = coordinates.x
    die_y = coordinates.y
  }

  //add the onclick fundtion. Default to do nothing when the function does not exist
  var onClick = null
  if( props.dieOnClick != null ){
    onClick = () => props.dieOnClick({
      container: props.container,
      wafer_struct: props.wafer_struct,
      die: props.die
      })
  }


  var tooltip = tooltips( props )

  const format = props.wafer_struct.format
  var x = die_x * format.width  + format.dx;
  var y = die_y * format.height + format.dy;

  // console.log( x, y, format.height, format.dy )

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={format.width}
        height={format.height}
        onClick={onClick}
        style={style}
        >

        {tooltip}
      </rect>

      <DieLabel
        {...props}
        x = {x}
        y = {y}
        onClick={onClick}
        bin_att = {bin_att}
        visible = {props.labelEnable}
        />

    </g>
    );
}



// returns the tool tip component when enabled by the props
function tooltips( props ){


  // logic for setting the binmap tooltips
  if( props.tooltipEnable !== true ) return null

  // set the tooltips to what was passed in the die object
  var tooltip = props.die.tooltip

  // default tooltip format when nothing was provided
  if( tooltip === undefined ){
    tooltip = `
      Wafer:
      Die X: ${props.die.die_x}
      Die Y: ${props.die.die_y}
      SBIN: ${props.die.sbin_num}
      HBIN: ${props.die.hbin_num}
      TEST: ${props.die.test_num}
    `
  }

  //wrap the tooltip string in html components
  tooltip = ( <title>{tooltip}</title>)

  return tooltip
}



// Die style i.e. fill color, edge color, etc. Attempts to use
// the style provided in the props, otherwise uses an automated
// styling scheme
function dieStyle( props, bin_type ){

  //generate a color based on the bin value when no color is specified
  var style = props.style

  if( style === undefined ){
    style = {stroke: "lightgrey"}

    style['fill'] = props.die.color
    if( (style['fill'] === null) | (style['fill'] === undefined) ){
      style['fill'] = get_color(props.die[bin_type])
    }
  }

  // decrease opacity for all non highlighted bins
  if( props.highlightBin !== undefined ){
    if( props.die[bin_type] !== props.highlightBin ){
      style['fill'] = convertHex(style['fill'], 20)
    }
  }

  return style
}




// when enabled, returns a text label to include in the die rectangle
function DieLabel( props ){

  if( props.visible !== true ) return null

  const bin_type = (props.bin_att === undefined) ? 'HBIN_NUM' : props.bin_att

  const tooltip = tooltips( props )

  return(
    <text
      x="0"
      y="0"
      fontSize={props.wafer_struct.format.height/2}
      textAnchor="middle"
      alignmentBaseline="center"
      cursor="default"
      onClick={props.onClick}
      transform={"scale(1, -1) translate(" +
        (props.x + props.wafer_struct.format.width/2) + ", " +
        (-(props.y+ props.wafer_struct.format.height/4)) + ")" }
      >

      {props.die[bin_type]}

      {tooltip}
    </text>

  )
}


export function WaferDies(props) {

  const x_att = (props.x_att === undefined) ? 'DIEX' : props.x_att
  const y_att = (props.y_att === undefined) ? 'DIEY' : props.y_att


  var dies = []
  for( var i=0; i < props.wafer_struct.chart.data.length; i++ ){
    var die = props.wafer_struct.chart.data[i]

    dies.push(
      <Die
        {...props}
        format={props.wafer_struct.format}
        die={die}
        key={props.container + ' ' + die[x_att] + ' ' + die[y_att]}
        />
    )
  }
  return dies;
}


/**
 * Generates a reference passing die based on the compressed reference data structure
 * @param       {[type]} props [description]
 * @constructor
 */
export function ReferenceDie( props ){

  if( props.visible !== true ) return null


  // set a default attribute name when none is provided as props
  const bin_att = (props.bin_att === undefined) ? 'HBIN_NUM' : props.bin_att
  const x_att = (props.x_att === undefined) ? 'DIEX' : props.x_att
  const y_att = (props.y_att === undefined) ? 'DIEY' : props.y_att


  var dies = []
  // props.wafer_struct.chart.reference.forEach(function(col, i) {
  for( var i=0; i < props.wafer_struct.chart.reference.length; i++ ){

    const col = props.wafer_struct.chart.reference[i]
    for( var die_y = col.min; die_y < col.max+1; die_y++ ){

      var coordinates = {x:col.ECIDX, y:die_y}

      // when specified in the props, convert the coordinates to UCS
      // This is not needed if the data is already mapped into UCS
      if( props.ucs !== false ){
        coordinates = toUCS(
          coordinates.x,
          coordinates.y,
          props.wafer_struct.chart.ucs_params,
          true )
      }


      //filter failnig die based on die coordinates.
      const coor_x = coordinates.x
      const coor_y = coordinates.y
      var existing = props.wafer_struct.chart.data.filter(
        row => (row[x_att] === coor_x) & (row[y_att] === coor_y)
      );

      //skip plotting die locations that already contain failures failing die
      if( existing.length > 0 ) continue


      var die = {
        [x_att]: coordinates.x,
        [y_att]: coordinates.y,
        [bin_att]: 1,
        color : 'white',
        }

      dies.push(
        <Die
           {...props}
           key={"Reference - (" + coordinates.x + ", " + coordinates.y + ")"}
           die={die}
           style={{
             ...props.style,
             ...{
               stroke: "lightgrey",
               fill: 'white',
               zIndex: 0,
             }}}
           />
       )

    }
  };

  return dies;

}


/**
 * Outlines the die locations containing
 * @param       {[type]} props [description]
 * @constructor
 */
export function OutlineDie( props ){


  // do not perform operation when no data is performed
  if( props.outlineDie === undefined ) return null

  const x_att = (props.x_att === undefined) ? 'DIEX' : props.x_att
  const y_att = (props.y_att === undefined) ? 'DIEY' : props.y_att

  var outline_array = []

  for( var i=0; i < props.outlineDie.length; i++ ){
    var die = JSON.parse(JSON.stringify(props.outlineDie[i]))
    die.color = 'transparent'

    var color = (props.outlineDie[i].color === undefined) ? 'black' : props.outlineDie[i].color

    outline_array.push(
      <Die
        key={`outline-${die[x_att]}-${die[y_att]}-`}
        {...props}
        die={die}
        style={{
          fill:'transparent',
          stroke: color,
          strokeWidth: 6,
          zIndex: 10,
        }}
        />
    )
  }

  return outline_array

}
