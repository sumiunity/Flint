/**
 * Wafer Gallery
 * ================
 *
 * Generates a n x m matrix of wafers provided the array of
 * wafer data structures (gallery)
 *
 * :Author: Nik Sumikawa
 * :Date: Jan 28, 2019
 */

import React from 'react';

import {Wafer5x5Row} from './components/Matrix'

// export function Wafer5x5Dev(props){
//
//   const data = require('../diamond')
//
//   return(
//       <Wafer5x5View
//         gallery = {data}
//         labelEnable = {true}
//         refEnable = {false}
//         />
//     )
// }


// onClick={props.onClick}
// gallery={props.gallery}
// refEnable={props.refEnable}
// labelEnable={props.labelEnable}
// waferLabel={props.waferLabel}
// lotLabel={props.lotLabel}
// highlight={props.highlight}
// highlightBin={props.highlightBin}
// bin_type={props.bin_type}
export function Wafer5x5View( props ){

  // do nothing when no binmap data is provided
  if( props.gallery === undefined ) return null

  // console.log( 'plotting 5x5 --', props.bin_type)
  var element_array = []
  for( var row=0; row < 5; row++ ){

    element_array.push(
      <div
        key={"gallery_row"+row}
        style={{
          display: "flex",
          overflow: "visible",
        }}>

        <Wafer5x5Row
          {...props}
          key={"wafer_gallery_row"+row}
          row={row}
          />

      </div>
      )
  }


  return (
    <div>
      {element_array}
    </div>
  );

}

export default Wafer5x5View;
