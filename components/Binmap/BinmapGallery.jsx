/**
 * Binmap Gallery
 * ================
 *
 * Wraps the binmap gallery and 5x5 matrix components into a single
 * component with helper functions to incease the usefulness of the
 * Component.
 *
 * :Author: Nik Sumikawa
 * :Date: May 8, 2020
 */

import React, {useState} from 'react';


import SemanticModal from '../../Frameworks/SemanticUI/Modal'

import {WaferView} from './Wafer'
import {Wafer5x5View} from './Wafer5x5'
import {WaferGalleryView} from './WaferGallery'


export function BinmapGalleryDev( props ){

  const data = require('../diamond')

  return(
    <BinmapGalleryView
      gallery={data}
      waferModal={true}
      selectWafers={false}
      matrix5x5_en={true}
      />
  )
}


/**
 * Wrap the binmap matrix routine to support wafer modals and wafers
 * selection capabilities( when enabled via the props)
 * @param  {Boolean} waferLabel         When True, the wafer number will be shown. defaults to False
 * @param  {Boolean} lotLabel           When True, the Lot nane will be shown. defaults to False
 * @param  {Boolean} ModalEnable        When True, a modal containing the selected wafer will be
 *                                      shown when a wafer is clicked
 * @param  {Boolean} refEnable          When True, the passing die locations will be shown. defaults to False
 * @param  {Boolean} highlightWafer     highlights a single, selected wafer
 * @param  {Boolean} highlightMultiple  highlights multiple, selected wafers
 * @param  {Boolean} matrix5x5_en       when True, the 5x5 matrix for a given lot is plotted.
 *                                      A gallery is returned by default
 * @param  {function} onClick           function exectued when a wafer is selected
 * @param  {Array} highlightBin         Array of bin numbers to highlight
 *
 * @return {Component}         Binmap Gallery Component
 */
export function BinmapGalleryView( props ){

  const [showModal, setShowModal] = useState(false)
  const [waferNumber, setWaferNumber] = useState()
  const [waferStruct, setWaferStruct] = useState()
  const [selectedWafers, setSelectedWafers] = useState([])

  // do nothing when no binmap data is provided
  if( props.gallery === undefined ) return null

  var onClick = (value) => {
    // open the wafer modal when specified
    if( props.waferModal ){
      setWaferNumber( value.wafer_struct.wafer_num )
      setWaferStruct( value.wafer_struct )
      setShowModal( true )
    }

    // tract the selected wafers when specified in the props
    if( props.selectWafers ){
      const container_id = value.container
      // remove the highlighted wafers when they currently exist in the buffer
      if( selectedWafers.includes(container_id) ){
        setSelectedWafers( selectedWafers.filter(row => row !== container_id) )
      }else{
        // add the wafer id to the buffer when it does not exist
        setSelectedWafers(selectedWafers.concat([container_id]) )
      }
    }
  }

  // set the default to a n x m gallery
  var GalleryComponent = (
    <WaferGalleryView
      {...props}
      key={'waferGallery'}
      onClick={onClick}
      highlight={selectedWafers}
      />
  )

  // when specified, plot the data in a 5x5 matrix.
  // This should only be used when viewing a single lot
  if( props.matrix5x5_en === true ){
    GalleryComponent = (
      <Wafer5x5View
        {...props}
        key={'wafer5x5'}
        onClick={onClick}
        highlight={selectedWafers}
        /> )
  }
  // return (<div>hello</div>)


  return (
    <div>
      {GalleryComponent}

      <SemanticModal
        header = {`Wafer: ${waferNumber}`}
        visible={showModal}
        onClose={() => setShowModal(false)}
        children={
          <div style={{maxWidth:'600px'}}>
            <WaferView
              {...props}
              key={'waferModal'}
              wafer_struct={waferStruct}
              labelEnable={true}
              onClick={(val) => console.log( 'onClick', val)}
              />
          </div>
        }
        />

    </div>
  );

}
