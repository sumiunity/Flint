/**
 * Binmap Format
 * ===============
 * Routines for formatting the wafer data structure to adhere to the standard.
 *
 *
 * Author : Nik Sumikawa and Matt Nero
 * Date : Sept 20, 2019
 */



import toUCS from './UCS'


export default function formatWaferStruct( wafer_struct ){

    //updates the formatting based on the default contents of the data structure

    //return error flag and halt processing when an error was previously encountered
    if( wafer_struct.error === true ){
      console.log( 'encountered error when importing default structure parameters')
      return true
    }

    // set the format to a variable for readability
    var format = wafer_struct.format
    var chart = wafer_struct.chart

    //compute the x and y range based on the reference binmap when provided
    var x_range = wafer_struct.format.x_range;
    var y_range = wafer_struct.format.y_range;

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
    format['width'] = format.diameter / (format.x_range[1] - format.x_range[0] + die_offset);
    format['height'] = format.diameter / (format.y_range[1] - format.y_range[0] + die_offset);

    var x_offset = format.width * (die_offset/2 - format.x_range[0])
    var y_offset = format.height * (die_offset/2 - format.y_range[0])

    format['dx'] = x_offset - format['width'] / 2;
    format['dy'] = y_offset - format['height'] / 2;
    //
    // //set default state to false to show the reference binmap
    // if( !wafer_struct.format.hasOwnProperty('refEnable')){
    //   wafer_struct.format['refEnable'] = false
    // }
    //
    // //set the default state to false for showing the bin labels
    // if( !wafer_struct.format.hasOwnProperty('labelEnable')){
    //   wafer_struct.format['labelEnable'] = false
    // }

    wafer_struct.format = format

    return wafer_struct

}
