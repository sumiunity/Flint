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
import jsonArray from  '../../../jsonArray'

export class refStruct{

  constructor( ref, ucs ){
    this.ref = ref;
    this.ucs = ucs
  }

  // flattens the reference binmap into x/y min/max coordinates
  flatten(){

    var coor = []
    var ref = JSON.parse(JSON.stringify(this.ref))
    for( let i=0; i < ref.length; i++ ){
      coor.push(toUCS(ref[i].ECIDX, ref[i].min, this.ucs))
      coor.push(toUCS(ref[i].ECIDX, ref[i].max, this.ucs))
    }

    ref = this.toYaxis()
    for( let i=0; i < ref.length; i++ ){
      coor.push(toUCS(ref[i].min, ref[i].ECIDY, this.ucs))
      coor.push(toUCS(ref[i].max, ref[i].ECIDY, this.ucs))
    }

    this.flat = new jsonArray(coor)

    return this.flat
  }


  // Converts the ecid coordinates to the universal coordinate system
  toUcs(coor='ECIDX'){

    if( this.ucs === undefined ){
      console.log('UCS object undefined')
      return this.ref
    }

    // flatten the reference when it does not exist
    if( this.flat === undefined ) this.flatten()

    // return the ucs x reference
    if( ['x', 'UCSX', 'ECIDX', 'DIEX'].includes(coor) ){
      var ucsx = this.flat.groupby(['x'])
      ucsx = ucsx.create_column('min', r => r.json_obj.min('y'))
      ucsx = ucsx.create_column('max', r => r.json_obj.max('y'))
      ucsx = ucsx.rename({x: 'UCSX'})

      return ucsx

    }else if ( ['y', 'UCSY', 'ECIDY', 'DIEY'].includes(coor) ){
      var ucsy = this.flat.groupby(['y'])
      ucsy = ucsy.create_column('min', r => r.json_obj.min('x'))
      ucsy = ucsy.create_column('max', r => r.json_obj.max('x'))
      ucsy = ucsy.rename({y: 'UCSY'})

      return ucsy

    }else {
      console.log('unknown coordinate attribute')
      return [];
    }

  }



  toYaxis(){

    var y_ref = {}
    var min, max

    var ref = JSON.parse(JSON.stringify(this.ref))

    var DIEX, DIEY
    if( Object.keys(ref[0]).includes('UCSX') ){
      DIEX = 'UCSX'
      DIEY = 'UCSY'
    }

    if( Object.keys(ref[0]).includes('ECIDX') ){
      DIEX = 'ECIDX'
      DIEY = 'ECIDY'
    }

    ref = ref.sort((a, b) => a[DIEX] - b[DIEX]);

    // internal used to add or update the reference
    const addOrUpdate = (obj, idx, value) => {
      if( !(Object.keys(obj).includes(idx.toString())) ){
        obj[idx] = [value]
      }else{
        obj[idx].push(value)
      }
      return obj
    }

    // const xArray = Object.keys(ref).sort()
    const halfWay = Math.floor(ref.length/2)

    for( let x=0; x < halfWay; x++ ){

      if( x === 0 ){
          min = ref[x].min
          max = ref[x].max

          for( let i=min; i < max; i++ ){
            y_ref[i] = [ref[x][DIEX]]
          }
      } else {

        // add all missing minimum up to the current min
        for( let i=ref[x].min; i < min; i++ ){
          y_ref[i] = [ref[x][DIEX]]
        }

        // add all missing maximum up to the current min
        for( let i=max; i < ref[x].max; i++ ){
          y_ref[i] = [ref[x][DIEX]]
        }

        //update the min and max
        min = ref[x].min
        max = ref[x].max
      }
    }

    // determine the max x coordinate for each y value
    for( let x=ref.length-1; x >= halfWay; x-- ){

      if( x === ref.length-1 ){
          min = ref[x].min
          max = ref[x].max

          for( let i=min; i < max; i++ ){
            addOrUpdate(y_ref, i, ref[x][DIEX])
          }
      } else {

        // add all missing minimum up to the current min
        for( let i=ref[x].min; i < min; i++ ){
          addOrUpdate(y_ref, i, ref[x][DIEX])
        }

        // add all missing maximum up to the current min
        for( let i=max; i < ref[x].max; i++ ){
          addOrUpdate(y_ref, i, ref[x][DIEX])
        }

        //update the min and max
        min = ref[x].min
        max = ref[x].max
      }
    }


    // convert into a json object
    var formatted = []
    const yValues = Object.keys(y_ref)
    for( let i=0; i < yValues.length; i++ ){
      formatted.push({
        [DIEY]: parseInt(yValues[i]),
        min: Math.min(...y_ref[yValues[i]]),
        max: Math.max(...y_ref[yValues[i]]),
      })
    }

    return formatted

  }


}


export default refStruct;
