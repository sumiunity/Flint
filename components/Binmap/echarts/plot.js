/**
 * Wafer Struct
 * ===============
 *
 * Data structure used for plotting binmaps
 *
 * @author Nik Sumikawa
 * @date Oct 16, 2020
 */


import jsonArray from '../../../jsonArray/jsonArray'

import refStruct from "./refStruct"
import rtclStruct from "./rtclStruct"
// import {get_color, rgbToHex} from '../components/Colors'

export class waferPlot{

  constructor( data=[], rtcl, ref, ucs ){

    this.ucs = ucs
    this.ref = new refStruct(ref, ucs)

    this.rtcl = new rtclStruct(rtcl, ucs)
    this.rtcl.toUcs() // add the rtcl parameters mapping into the UCS

    this.data = data
    if( !(data instanceof jsonArray) ) this.data = new jsonArray(data)

    this.option = data.echartsOptions
  }

  addDie( label=false, value='VALUE' ){
    var parameters = {
      colx: 'DIEX',
      coly: 'DIEY',
      value: value,
      label: label,
    }

    // when avaiable, add the color column (used when joining the bin data)
    if( this.data.columns.includes('color') ) parameters['color'] = 'color'

    this.option = this.option.rectGrid(parameters)
  }

  addRtclX(){

    const ucsRef = this.ref.toUcs('ECIDX')

    var xRtcl=[]
    ucsRef.forEach( (r, idx) => {
      if( (r.UCSX - this.rtcl.rtcl.ucs.x) % this.rtcl.rtcl.ucs.width === 0 ){
        xRtcl.push([r.UCSX, r.min-1, r.max])
      }
    })

    this.option = this.option.append_series(
      this.data.echartsSeries.vline({
          data: xRtcl,
          color: 'black',
          border: 'black',
          zIndex: 100,
      })
    )

  }

  addRtclY(){

    const ucsRef = this.ref.toUcs('ECIDY')
    // const ucsRef = this.ref.toYaxis()

    var yRtcl=[]
    ucsRef.forEach( (r, idx) => {
      if( (r.UCSY - this.rtcl.rtcl.ucs.y) % this.rtcl.rtcl.ucs.height === 0 ){
        yRtcl.push([r.UCSY-1, r.min, r.max+1])
      }
    })

    this.option = this.option.append_series(
      this.data.echartsSeries.hline({
          data: yRtcl,
          // color: 'black',
          border: 'black',
          color: 'color',
      })
    )

  }


  waferShape(xRange, yRange){

    // if( radius === undefined ){
    //   radius = Math.max(this.data.max('DIEX'), this.data.max('DIEY'))
    // }

    const xDiameter = Math.abs(xRange[1] - xRange[0])
    const yDiameter = Math.abs(yRange[1] - yRange[0])
    const radius = Math.abs(Math.min(xDiameter, yDiameter))/2

    this.option = this.option.append_series(
        this.data.echartsSeries.circle({
            data: [[
              Math.max(...xRange) - xDiameter/2 + 0.5,
              Math.max(...yRange) - yDiameter/2 - 0.5,
              ]],
            radius: radius*1.1,
            color: '#fbeebb',
            border: '#daad0b'
        })
      )

    this.option = this.option.append_series(
        this.data.echartsSeries.circle({
            data: [[
              Math.max(...xRange) - xDiameter/2 + 0.5,
              Math.max(...yRange) - yDiameter/2 - 0.5 - (yDiameter/2)*1.1
            ]],
            radius: radius*0.04,
            color: '#FFFFFF',
            border: '#FFFFFF'
        })
      )


  }

  /// scales the binmap plot to file the plot area
  scale( xRange, yRange ){

    this.option.xAxis[0]['min'] = Math.min(...xRange)
    this.option.xAxis[0]['max'] = Math.max(...xRange)

    this.option.yAxis[0]['min'] = Math.min(...yRange)
    this.option.yAxis[0]['max'] = Math.max(...yRange)

    this.option.animation = false

    this.option['grid'] = {
        bottom: '8%',
        top: '7%',
        left: '7%',
        right: '8%',
        }
  }


  dev(){
    this.option.xAxis[0]['show'] = true
    this.option.yAxis[0]['show'] = true
  }

  plotOption(data){

    if( data === undefined ) data = this.data

    var option = data.echartsOptions

    option = option.rectGrid({
      colx: 'DIEX',
      coly: 'DIEY',
      value: 'VALUE',
      label: false,
    })


    option = option.append_series(
        data.echartsSeries.circle({
            data: [[0.5, -0.5]],
            radius: 31.5,
            color: '#fbeebb',
            border: '#daad0b'
        })
      )

    option = option.append_series(
        data.echartsSeries.circle({
            data: [[0.5, -32]],
            radius: 29*0.04,
            color: '#FFFFFF',
            border: '#FFFFFF'
        })
      )

    option.xAxis[0]['min'] = data.min('DIEX')
    option.xAxis[0]['max'] = data.max('DIEX')
    option.xAxis[0]['show'] = true
    option.yAxis[0]['min'] = data.min('DIEY')
    option.yAxis[0]['max'] = data.max('DIEY')
    option.yAxis[0]['show'] = true
    option.zoom({
      scroll: true,
      sliders : {
        xAxis: true,
        yAxis: true
      }
    })

    option['grid'] = {
        bottom: '5%',
        top: '5%',
        left: '5%',
        right: '5%',
        }

    console.log( option)
    return option
  }


}


export default waferPlot;
