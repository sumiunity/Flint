/**
 * Binmap Chart Components
 * ========================
 * Components used when generating the Binmap plots
 *
 * Author : Nik Sumikawa and Matt Nero
 * Date : Aug 21, 2019
 */

import React from 'react';

import WaferView, {EmptyWaferView} from '../Wafer'


// onClick={props.onClick}
// refEnable={props.refEnable}
// labelEnable={props.labelEnable}
// highlightBin={props.highlightBin}
// bin_type={props.bin_type}
export function Wafer5x5Row(props) {

  var elements_array = []


  //default the row number to 0 when it's not provided
  var row = 0
  if( props.row != null ){ row = props.row }

  // extract a list of wafers to compare against to check status
  const wafer_list = props.gallery.map(r => r.wafer )
  console.log('waferl;ist', wafer_list)
  for (var col =0 ; col < 5; col++) {

    const container_id = row*5 + col
    const wafer_num  = (container_id + 1).toString()

    // create an empty plot when data does not exist for the wafer
    var WaferComponent
    var style = {
      padding: "0.5%",
      width: '100%',
    }

    // populate an empty wafer view when the wafer doesn't exist
    if( !(wafer_list.includes(wafer_num))){
      WaferComponent = <EmptyWaferView />

    // render the wafer based on the specifications
    }else{
      var wafer_struct = props.gallery.filter(w => w.wafer === wafer_num)[0]

      console.log( wafer_struct )
      // highlight the wafer when specified
      style = highlight_container(
        props.highlight,
        container_id,
        {...style})

      WaferComponent = (
        <WaferView
          {...props}
          container={container_id}
          wafer_struct={wafer_struct}
          />

      )
    }

    //add a add the wafer when it exists, otherwise add blank circle when it does not exist.
    elements_array.push(
      <div
        key={`Wafer5x5_Row-${col}`}
        style={style}>

        { props.waferLabel === undefined
          ? null
          : <p style={{position:'absolute'}}>{row*5 + col + 1}</p>
        }

        {WaferComponent}

      </div>
    );

  }


  return elements_array;
}


/**
 * Generates a row of wafermaps in the order in which they reside in the
 * gallery objects
 */
export function WaferGalleryRow(props) {

  //default the row number to 0 when it's not provided
  var row = 0
  if( props.row != null ){ row = props.row }

  //limit the number of columns per row to 5
  var col_count = 5
  if( props.gallery.length - (row*5) < 5 ){
    col_count = props.gallery.length - (row*5)
  }

  var style = {
    padding: "0.5%",
    width: '100%',
  }

  // console.log( 'Gallery Row', props.row, col_count)
  var elements_array = []
  for (var col = 0; col < 5; col++) {

    // default style for the wafer container. this will be extended
    // based on props and the data availabiliry


    var wafer_element
    if( col < col_count ){

      const container_id = row*5 + col
      const data = props.gallery[container_id]

      if( data === undefined ) continue

      // when provided, provide background to highlight specific wafers
      const container_style = highlight_container( props.highlight, container_id, {...style} )

      wafer_element = (
        <div style={container_style} >
          { props.waferLabel === undefined
            ? null
            : <p style={{position:'absolute'}}>{data.wafer}</p>
          }

          <WaferView
            {...props}
            wafer_struct={data}
            container={row*5+col}
            />
          { props.lotLabel === undefined
            ? null
            : <p style={{textAlign:'center', whiteSpace: 'pre'}}>{data.lot}</p>
          }
        </div>
      )


    // add an empty wafer when no additional wafers exist
    }else{
      wafer_element = <EmptyWaferView />
    }



    //add a add the wafer when it exists, otherwise add blank circle when it does not exist.
    elements_array.push(

      <div
        key={`GalleryCol-${col}`}
        style={ style }
        >

        { wafer_element }
      </div>
    );

  }


  return( elements_array );
}


// returns the style for highlightin wafers of interest
function highlight_container( highlight, container_id, style ){

  // when provided, provide background to highlight specific wafers
  if( highlight !== undefined ){
    if( highlight.includes(container_id) ){
      // extract color and default to yellow when not provided
      style['backgroundColor'] = 'yellow'
      style['borderColor'] = '#B0B0B0'
      style['borderStyle'] = 'solid'
      style['borderWidth'] = '1px'
    }
  }

  return style

}
