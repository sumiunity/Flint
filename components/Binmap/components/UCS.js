/**
 * Universal Coordinate System
 * ==============================
 *
 * Converts the ECID to universal coordinate system
 *
 * :Author: Nik Sumikawa
 * :Date: Jan 23, 2020
 */



// Converts the coordinates from ecid to universal coordinate
// system (notch down) when enabled and the ucs parameters are
// provided. Otherwise returns the ecid coordinates with no
// convsrsion
export default function toUCS( x, y, ucs_params, ucs_enable=true ){

  if( (ucs_params === undefined)|(ucs_enable !== true)){
    return { x: x, y: y }
  }


  if( ucs_params.x_invert === true ){
    x = x * -1
  }
  if( ucs_params.y_invert === true ){
    y = y * -1
  }

  x = x - ucs_params.x_offset
  y = y - ucs_params.y_offset



  if( ucs_params.xy_swap === true ){
    return { x: y, y: x }
  }


  return { x: x, y: y }
}


export function fromUCS( x, y, ucs_params ){

  if( ucs_params === undefined){
    return { x: x, y: y }
  }

  var temp_x = x
  var temp_y = y
  if( ucs_params.xy_swap === true ){
    temp_x = y
    temp_y = x
  }

  temp_x = temp_x + ucs_params.x_offset
  temp_y = temp_y + ucs_params.y_offset


  if( ucs_params.x_invert === true ){
    temp_x = temp_x * -1
  }

  if( ucs_params.y_invert === true ){
    temp_y = temp_y * -1
  }

  return { x: temp_x, y: temp_y }
}
