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
import toUCS from  '../components/UCS'
import {get_color, rgbToHex} from '../components/Colors'
import waferPlot from './plot'

export class waferStruct{

  constructor( props ){

    this.initialize(props)
    this.diameter = 1000;

  }

  // inializes the data structure based on the props object
  initialize( props ){

    if( props.wafer !== undefined ) this.wafer = props.wafer
    if( props.lot !== undefined ) this.lot = props.lot
    if( props.wplot !== undefined ) this.wplot = props.wplot
    if( props.total !== undefined ) this.total = props.total
    if( props.ref !== undefined ) this.ref = props.ref
    if( props.rtcl !== undefined ) this.rtcl = props.rtcl
    if( props.ucs !== undefined ) this.ucs = props.ucs
    if( props.data !== undefined ) this.uld = props.data
    if( props.ref_struct !== undefined ) this.ref_struct(props.ref_struct)

  }

  get wafer(){ return this.wafer_num }
  set wafer( value ){ this.wafer_num = value }

  get uld(){ return this.data }
  set uld( value ){ this.data = new jsonArray(value) }

  get ref(){ return this.reference }
  set ref( value ){ this.reference = value }

  get rtcl(){ return this.reticle }
  set rtcl( value ){ this.reticle = value[0] }

  get ucs(){ return this.ucs_params }
  set ucs( value ){ this.ucs_params = value[0] }

  ref_struct( ref_struct ){
    this.ref = ref_struct.reference
    this.rtcl = ref_struct.reticle
    this.ucs = ref_struct.ucs_params
    this.format()
  }

  // returns the plot class, which can be used
  // to create custom binmap plots
  plotter(data){

    if( data === undefined ) data = this.data
    return new waferPlot(data, this.rtcl, this.ref, this.ucs)
  }

  // standard binmap plot with options passed in as props
  plotOption(data, props={label:false, value:'VALUE'}){

    if( data === undefined ) data = this.data

    var plot = this.plotter(data)

    plot.addDie(props.label, props.value)
    plot.waferShape(this.x_range, this.y_range)
    plot.scale(this.x_range, this.y_range)

    plot.addRtclX()
    plot.addRtclY()
    // plot.dev()
    //

    return plot.option

  }

  // Create a color using the RGB values fromt he bin data and
  // assigns it to each die based on the associated bin value
  joinBinData( binData ){

    if( !(binData instanceof jsonArray) ) binData = new jsonArray(binData)

    binData = binData.to_rgb('R', 'G', 'B')
    binData = binData.rename({rgb: 'color'})

    this.data = this.data.merge( binData, {on_left:'VALUE', on_right: 'BIN_NUM'})
  }

  format(){

    if( this.reference.length === 0 ){
      alert('please provide a reference')
    }

    const x_array = this.reference.map( row => row.ECIDX )
    const y_min_array = this.reference.map( row => row.min )
    const y_max_array = this.reference.map( row => row.max )

    const min_val = toUCS(
      Math.min(...x_array),
      Math.min(...y_min_array),
      this.ucs_params,
      )

     const max_val = toUCS(
       Math.max(...x_array),
       Math.max(...y_max_array),
       this.ucs_params,
       )

    var x_range = [min_val.x, max_val.x].sort()
    var y_range = [min_val.y, max_val.y].sort()


    this.diameter = 1000;

    this.x_range = x_range;
    this.y_range = y_range;

    var die_offset = 4; //wafer_struct shrinks the wafermap to better fit into the citcle
    this.width = this.diameter / (Math.max(...this.x_range) - Math.min(...this.x_range) + die_offset);
    this.height = this.diameter /(Math.max(...this.y_range) - Math.min(...this.y_range) + die_offset);

    var x_offset = this.width * (die_offset/2 - Math.min(...this.x_range))
    var y_offset = this.height * (die_offset/2 - Math.min(...this.y_range))

    // const offset = 0.40
    // format['width'] = (format.diameter - (format.diameter * offset)) / (format.x_range[1] - format.x_range[0]);
    // format['height'] = (format.diameter - (format.diameter * offset)) / (format.y_range[1] - format.y_range[0]);
    //
    // var x_offset = format.diameter * offset/2
    // var y_offset = format.diameter * offset/2


    this.dx = x_offset - this.width / 2;
    this.dy = y_offset - this.height / 2;

  }

  // fills all missing die coordinates with those taken from the reference
  fillna( data, wafer, concat=true ){

    if( data === undefined ) data = this.data

    data = data.create_column('ECID', r => `${r.DIEX}-${r.DIEY}`)
    // extract an array of existing die locations
    const existing = this.data.map(r => r.ECID)

    var newData = []

    for( var i=0; i < this.reference.length; i++ ){
      const ref = this.reference[i]
      const DIEX = ref.ECIDX
      for( var DIEY=ref.min; DIEY <= ref.max; DIEY++ ){

        const ucs = toUCS(DIEX, DIEY, this.ucs_params)

        if( existing.includes(`${ucs.x}-${ucs.y}`) ) continue

        newData.push({
          "WAFER": wafer,
          "DIEX": ucs.x,
          "DIEY": ucs.y,
          "TYPE": "P",
          "VALUE": "",
          "R": 255,
          "G": 255,
          "B": 255,
        })
      }
    }

    // return only new entries when concat is not set
    if( concat === false ){
      return new jsonArray(newData)
    }

    return new jsonArray(data.concat(newData))
  }

  // stacks all wafers belonging to the DataFrame
  stack( data ){

    if( data === undefined ) data = this.data

    // count the total number of wafers in the DataFrame
    this.wafers = data.unique('WAFER').length

    // count the total unique x/y values
    data = data.count_values(['DIEX','DIEY'])

    // invert the count
    data = data.apply('count', (val) => this.wafers-val )

    // convert the count into a ratio
    data = data.apply(
      'count',
      (val) => `${(100*(val)/this.wafers).toFixed(0)}`,
      'ratio' )

    return data
    // return this.fillna(data, 'stacked')

  }


  // Converts the ecid coordinates to the universal coordinate system
  toUcs(x_att, y_att){


    for( var i=0; i < this.data.length; i++ ){
      const ucs = toUCS(
        this.data[i][x_att],
        this.data[i][y_att],
        this.ucs_params
       )

       this.data[i][x_att] = ucs.x
       this.data[i][y_att] = ucs.y
    }
  }

  // defines the color for each entry based on the provided function
  set_color( func ){
    for( var i=0; i < this.data.length; i++ ){
      this.data[i].color = func(this.data[i])
    }
  }

  // sets the die color to a shade of red based on the column value
  reds_color( col, min=0, max=25 ){
    const func = (row) => get_color(row[col], 'reds', min, max)
    this.set_color( func )
  }

  // sets the die color to a shade of red based on the column value
  color( col, min=0, max=25, color_type='stoplight' ){
    const func = (row) => get_color(row[col], color_type, min, max)
    this.set_color( func )
  }

  // sets the die color based on the value of the R, G, B columns
  rgb_color( R, G , B ){
    const func = (row) => rgbToHex(row[R], row[G], row[B] )
    this.set_color( func )
  }

}


export default waferStruct;
