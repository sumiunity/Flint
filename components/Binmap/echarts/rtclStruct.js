/**
 * Wafer Struct
 * ===============
 *
 * Data structure used for plotting binmaps
 *
 * @author Nik Sumikawa
 * @date Oct 16, 2020
 */


import toUCS from  '../components/UCS'

export class rtclStruct{

  constructor( rtcl, ucs ){
    this.rtcl = rtcl;
    this.ucs = ucs
  }


  // Converts the ecid coordinates to the universal coordinate system
  toUcs(){

    if( this.ucs === undefined ){
      console.log('UCS object undefined')
      return this.ref
    }

    const ucs = toUCS( this.rtcl.ECIDX, this.rtcl.ECIDY, this.ucs)

    // set defaults for the rtcl height and width
    var height = this.rtcl.height
    var width = this.rtcl.width

    // swap them when the axis are swapped
    if( this.ucs.xy_swap === true ){
      height = this.rtcl.width
      width = this.rtcl.height
    }

    this.rtcl['ucs'] = {
      x: ucs.x,
      y: ucs.y,
      height: height,
      width: width
    }

    return this.rtcl
  }



}


export default rtclStruct;
