/**
 * Colors
 * ======
 *
 * Description
 * -----------
 * Routiens for generating colors based on a given index
 *
 */

import {ENTROPY} from './colors/entropy_pallet'
import {ENTROPY_8BIT} from './colors/entropy_8bit'
import {REDS} from './colors/reds'
import {STOPLIGHT} from './colors/stoplight'




export function color( index, opacity, color_type='entropy', min=null, max=null, invert=true){
  const color_hex = get_color( index, color_type, min, max, invert )

  return convertHex(color_hex, opacity)
}

//
 /**
  * returns the color at the specified index. Round robbin selection implemented
  * @param  {Int} index                  color index
  * @param  {String} [color_type='entropy'] color type definition
  * @return {String}                        hex color string
  */
export function get_color( index, color_type='entropy', min=null, max=null, invert=true ){

   //select the color type. Default to entropy
   var colors = ENTROPY
   if( color_type === 'entropy' ){colors = ENTROPY}
   if( color_type === 'entropy_8bit' ){colors = ENTROPY_8BIT}
   if( color_type === 'reds' ){colors = REDS}
   if( color_type === 'stoplight' ){colors = STOPLIGHT}

   const max_colors = colors.length - 1

   var step_size
   var val = index

   if( max !== null) {

     //default the color range assuming there is no minum value
     // var step_size = max_colors/max
     // var val = max_colors - Math.floor((index*step_size))
     // if( invert ){ val = max_colors - Math.floor((index*step_size)) }
     //
     //change the scale and color range when a minimum value exists
    if( min !== null ){
       step_size = max_colors/(max - min + 1)

       //determine the color value
       val = max_colors - Math.floor((index*step_size)-min)
       if( invert ){ val = max_colors - Math.floor((index*step_size)-min) }

     //scale the colors when there is no minimum value
     }else{
       step_size = max_colors/max
       val = max_colors - Math.floor((index*step_size))
       if( invert ){ val = max_colors - Math.floor((index*step_size)) }
     }

     //set an upper and lower bound to avoid accessing outside of the array
     if( val > max_colors ){ val = max_colors }
     if( val < 0 ){ val = 0}

     return colors[val]
   }


   // for continuous color schemes, cap the positive and negative sizes of th
   // array
   if( color_type === 'reds' ){

     val = max_colors-index

     // Invert the color scheme and check to ensure the highside
     // doesn't run off the negative side of the array
     if( invert === true ){
       if( val < 0 ){ val = 0}
       return colors[val]
     }

     if( val > max_colors ){ val = max_colors }

     return colors[val]
   }


   return colors[val%colors.length]
 }


export function convertHex(hex,opacity){
    hex = hex.replace('#','');
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);

    return 'rgba('+r+','+g+','+b+','+opacity/100+')';

}


 export function int_to_color(v, min=0, max=100) {
   v = 100*((v-min) / (max - min)) - 1
   v = Math.max(0, v)
   return REDS[Math.round(v)]
 }

 export function shadeHexColor(color, percent) {
   // changes the color by a percent. positive percentage are lighter and negative are darker
   var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=(f>>8)&0x00FF,B=f&0x0000FF;
   return "#"+( 0x1000000+(Math.round((t-R)*p)+R) *
                0x10000+(Math.round((t-G)*p)+G) *
                0x100+(Math.round((t-B)*p)+B))
                .toString(16)
                .slice(1);
 }

/**
 * Converts a single RGB component to hex string
 * @param  {8bit integer} c 8 bit color integer
 * @return {string}   hex string for the specified component
 */
export function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

/**
 * returns the hex string based on the provided components
 * @param  {string} r red color component integer value
 * @param  {string} g green color component integer value
 * @param  {string} b blue color component integer value
 * @return {string}   hex color string
 */
export function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


export default get_color
