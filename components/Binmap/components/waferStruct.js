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

export class waferStruct{

  constructor( props ){

    this.error = false
    this.format = {
      x_axis: false,
      y_axis: false
    }

    this.chart = {
      data: [],
      reference: [],
      reticle: {},
      ucs_params: {},
    }

    this.initialize(props)
  }

  // inializes the data structure based on the props object
  initialize( props ){

    if( props.error !== undefined ) this.error = props.error
    if( props.format !== undefined ) this.format = props.format
    if( props.chart !== undefined ){
      this.chart = props.chart
      this.update_format()
    }

    if( props.wafer !== undefined ) this.wafer = props.wafer
    if( props.lot !== undefined ) this.lot = props.lot
    if( props.wplot !== undefined ) this.wplot = props.wplot
    if( props.total !== undefined ) this.total = props.total
    if( props.data !== undefined ) this.data = props.data
    if( props.ref !== undefined ) this.ref = props.ref
    if( props.rtcl !== undefined ) this.rtcl = props.rtcl
    if( props.ucs !== undefined ) this.ucs = props.ucs
    if( props.ref_struct !== undefined ) this.ref_struct(props.ref_struct)

  }

  get wafer(){ return this.wafer_num }
  set wafer( value ){ this.wafer_num = value }


  get data(){ return this.chart.data }
  set data( value ){ this.chart.data = new jsonArray(value) }

  get ref(){ return this.chart.reference }
  set ref( value ){ this.chart.reference = value }

  get rtcl(){ return this.chart.reticle }
  set rtcl( value ){ this.chart.reticle = value[0] }

  get ucs(){ return this.chart.ucs_params }
  set ucs( value ){ this.chart.ucs_params = value[0] }

  ref_struct( data_struct ){
    this.ref = data_struct.reference
    this.rtcl = data_struct.reticle
    this.ucs = data_struct.ucs_params
    this.update_format()
  }


  update_format(){


    const toUCS = require( './UCS' ).default

    // set the format to a variable for readability
    var format = this.format
    var chart = this.chart

    //compute the x and y range based on the reference binmap when provided
    var x_range = this.format.x_range;
    var y_range = this.format.y_range;


    if( chart.reference.length > 0 ){

      const x_array = chart.reference.map( row => row.ECIDX )
      const y_min_array = chart.reference.map( row => row.min )
      const y_max_array = chart.reference.map( row => row.max )

      const min_val = toUCS(
        Math.min(...x_array),
        Math.min(...y_min_array),
        chart.ucs_params,
        true)

       const max_val = toUCS(
         Math.max(...x_array),
         Math.max(...y_max_array),
         chart.ucs_params,
         true)


       x_range = [min_val.x, max_val.x].sort()
       y_range = [min_val.y, max_val.y].sort()


    }

    format['diameter'] = 1000;

    //update the x and y ranges
    format['x_range'] = x_range
    format['y_range'] = y_range

    //TODO: adjust the die offset based on the pdpw to better fit the wafer
    var die_offset = 4; //wafer_struct shrinks the wafermap to better fit into the citcle
    format['width'] = format.diameter / (Math.max(...format.x_range) - Math.min(...format.x_range) + die_offset);
    format['height'] = format.diameter /(Math.max(...format.y_range) - Math.min(...format.y_range) + die_offset);

    var x_offset = format.width * (die_offset/2 - Math.min(...format.x_range))
    var y_offset = format.height * (die_offset/2 - Math.min(...format.y_range))

    // const offset = 0.40
    // format['width'] = (format.diameter - (format.diameter * offset)) / (format.x_range[1] - format.x_range[0]);
    // format['height'] = (format.diameter - (format.diameter * offset)) / (format.y_range[1] - format.y_range[0]);
    //
    // var x_offset = format.diameter * offset/2
    // var y_offset = format.diameter * offset/2


    format['dx'] = x_offset - format['width'] / 2;
    format['dy'] = y_offset - format['height'] / 2;

    this.format = format

  }


  // populate the format object from the full reference binmap
  format_from_full_ref(){


    const toUCS = require( './UCS' ).default

    // set the format to a variable for readability
    var format = this.format
    var chart = this.chart

    //compute the x and y range based on the reference binmap when provided
    var x_range = this.format.x_range;
    var y_range = this.format.y_range;


    if( chart.reference.length > 0 ){

      const x_array = chart.reference.map( row => row.ECIDX )
      const y_array = chart.reference.map( row => row.ECIDY )

      const min_val = toUCS(
        Math.min(...x_array),
        Math.min(...y_array),
        chart.ucs_params,
        true)

       const max_val = toUCS(
         Math.max(...x_array),
         Math.max(...y_array),
         chart.ucs_params,
         true)


       x_range = [min_val.x, max_val.x].sort()
       y_range = [min_val.y, max_val.y].sort()


    }

    format['diameter'] = 1000;

    //update the x and y ranges
    format['x_range'] = x_range
    format['y_range'] = y_range

    //TODO: adjust the die offset based on the pdpw to better fit the wafer
    var die_offset = 4; //wafer_struct shrinks the wafermap to better fit into the citcle
    format['width'] = format.diameter / (format.x_range[1] - format.x_range[0] + die_offset);
    format['height'] = format.diameter / (format.y_range[1] - format.y_range[0] + die_offset);

    var x_offset = format.width * (die_offset/2 - format.x_range[0])
    var y_offset = format.height * (die_offset/2 - format.y_range[0])


    format['dx'] = x_offset - format['width'] / 2;
    format['dy'] = y_offset - format['height'] / 2;

    this.format = format

  }


  // Converts the ecid coordinates to the universal coordinate system
  toUcs(x_att, y_att){

    const toUCS = require( './UCS' ).default

    for( var i=0; i < this.chart.data.length; i++ ){
      const ucs = toUCS(
        this.chart.data[i][x_att],
        this.chart.data[i][y_att],
        this.chart.ucs_params,
        true
       )

       this.chart.data[i][x_att] = ucs.x
       this.chart.data[i][y_att] = ucs.y
    }
  }

  // defines the color for each entry based on the provided function
  set_color( func ){
    for( var i=0; i < this.chart.data.length; i++ ){
      this.chart.data[i].color = func(this.chart.data[i])
    }
  }

  // sets the die color to a shade of red based on the column value
  reds_color( col, min=0, max=25 ){
    const get_color = require('./Colors').get_color
    const func = (row) => get_color(row[col], 'reds', min, max)
    this.set_color( func )
  }

  // sets the die color to a shade of red based on the column value
  color( col, min=0, max=25, color_type='stoplight' ){
    const get_color = require('./Colors').get_color
    const func = (row) => get_color(row[col], color_type, min, max)
    this.set_color( func )
  }

  // sets the die color based on the value of the R, G, B columns
  rgb_color( R, G , B ){
    const rgbToHex = require('./Colors').rgbToHex
    const func = (row) => rgbToHex(row[R], row[G], row[B] )
    this.set_color( func )
  }

}

export default waferStruct;
