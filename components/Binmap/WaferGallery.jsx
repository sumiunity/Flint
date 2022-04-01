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

import {WaferGalleryRow} from './components/Matrix'

export function WaferGalleryDev( props ){

  const data = require('../diamond')

  return(
      <WaferGalleryView
        gallery = {data}
        labelEnable = {true}
        refEnable = {false}
        />
    )
  }

// onClick={props.onClick}
// gallery={props.gallery}
// refEnable={props.refEnable}
// labelEnable={props.labelEnable}
// waferLabel={props.waferLabel}
// lotLabel={props.lotLabel}
// highlight={props.highlight}
// highlightBin={props.highlightBin}
// bin_type={props.bin_type}
export function WaferGalleryView( props ){

  // do nothing when no binmap data is provided
  if( props.gallery === undefined ) return null


  var element_array = []
  for( var row=0; row < Math.ceil(props.gallery.length/5); row++ ){

    element_array.push(
      <div
        key={"gallery_row"+row}
        style={{
          display: "flex",
          overflow: "visible",
        }}>

        <WaferGalleryRow
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

export default WaferGalleryView;
