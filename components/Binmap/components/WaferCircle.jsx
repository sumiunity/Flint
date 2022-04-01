/**
 * Binmap Chart Components
 * ========================
 * Components used when generating the Binmap plots
 *
 * Author : Nik Sumikawa and Matt Nero
 * Date : Aug 21, 2019
 */

import React from 'react';



//generates the wafer background
export default function WaferCircle(props) {

  const backgroundColor = "#F8DE7E"
  const edgeColor = '#E3B50C'
  // define the size of the svg images. This will have no impact on the
  // render performance, but it will impact the image size

  //return circle with no onclick function when the datastructure is empty
  if( props.wafer_struct === undefined ){
    return( <circle
      cx= "500"
      cy= "500"
      r="500"
      strokeWidth="3"
      stroke={edgeColor}
      fill={backgroundColor}
      />
    )
  }

  var diameter = props.wafer_struct.format.diameter

  return(
    <>
      <circle
        cx= {diameter/2}
        cy= {diameter/2}
        r={diameter/2}
        strokeWidth="3"
        stroke={edgeColor}
        fill={backgroundColor}
        onClick={props.onClick}/>

      <circle
        cx= {diameter/2}
        cy= {0}
        r={20}
        stroke="#FFFFFF"
        strokeWidth="3"
        fill={'#FFFFFF'}
        onClick={props.onClick}/>
    </>
  )

}
