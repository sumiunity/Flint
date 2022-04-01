/**
 * Dynamic Reports
 * ================
 *
 * Container with 5x5 binmap, bin pareto and stacked binmap that
 * replicates the dynamic reports look and feel. The components
 * are connected to create a good user experience
 *
 * :Author: Nik Sumikawa
 * :Date: May 12, 2020
 */

import React, {useState} from 'react';

import { Grid, Dropdown, Segment } from 'semantic-ui-react'

import LoadIcon from '../../Frameworks/SemanticUI/LoadIcon'
import RestFramework from '../../Frameworks/RestApi'
import SemanticModal from '../../Frameworks/SemanticUI/Modal'
import {ErrorMessages} from '../../Frameworks/Nxp/ErrorMessages'


import {BinmapGalleryView} from './BinmapGallery'
import {BinmapStackedView} from './Stacked'
import {BinmapParetoView} from './BinmapPareto'





export function DynamicReportsDev( props ){

  const data = require('../diamond')

  return(
    <DynamicReportsView
      binmap = {data}
      />
  )
  // return(
  //   <DynamicReportsComponent lot={'TZ58549.1J'} />
  // )
}



export function DynamicReportsView( props ){

  const [selectedRow, setSelectedRow] = useState()
  const [showModal, setShowModal] = useState(false)
  const [binType, setBinType] = useState('HBIN_NUM')
  const [selectedBin, setSelectedBin] = useState()

  if( props.binmap === undefined ) return <LoadIcon condition = {true}/>
  if( props.binmap.length === 0 ) return <ErrorMessages errorType='Data' />

  return (
    <Segment>
      <Grid
        celled
        style={{
          paddingLeft:'5px',
          paddingRight:'10px',
        }}>


        <Grid.Row>

          <Grid.Column width={11}>
            <BinmapGalleryView
              gallery={props.binmap}
              waferModal={true}
              highlightBin={selectedBin}
              highlight={props.highlight}
              waferLabel={true}
              matrix5x5_en={true}
              bin_type={binType}
              />
          </Grid.Column>

          <Grid.Column
            width={5}
            style={{paddingTop:'0'}}>

            <Grid.Row>
              <Dropdown
                fluid
                selection
                defaultValue = 'HBIN_NUM'
                onChange = {(e,v) => setBinType(v.value)}
                options={[
                  { key: 'SBIN_NUM', text: 'SOFT BIN', value: 'SBIN_NUM' },
                  { key: 'HBIN_NUM', text: 'HARD BIN', value: 'HBIN_NUM' },
                ]} />
            </Grid.Row>

            <Grid.Row>
              <div style={{height: '500px', width:'100%', overflowY:'auto'}}>
              <BinmapParetoView
                gallery={props.binmap}
                bin_type={binType}
                selectedRow={selectedRow}
                onClick={(value) => {
                  // reset the selected bin when the bin selected twice
                  if( selectedBin === value.row_data[binType] ){
                    setSelectedBin( undefined )
                    setSelectedRow( undefined )
                  }else{
                    setSelectedBin( value.row_data[binType] )
                    setSelectedRow( value.row )
                  }
                }}
                />
              </div>
            </Grid.Row>

            <Grid.Row>
              <BinmapStackedView
                gallery={props.binmap}
                onClick={() => setShowModal(true)}
                bin={selectedBin}
                bin_type={binType}
                />

              <SemanticModal
                header = {`Stacked Binmap`}
                visible={showModal}
                onClose={() => setShowModal(false)}
                children={
                  <BinmapStackedView
                    key={'stackedModal'}
                    gallery={props.binmap}
                    labelEnable={true}
                    />
                }
                style={{margin: '0 auto'}}
                />

            </Grid.Row>

          </Grid.Column>

        </Grid.Row>
      </Grid>
    </Segment>


  );

}



export default class DynamicReportsComponent extends RestFramework {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    if( this.props.lot !== undefined ){
      this.GET({
        key: 'binmap_struct',
        parameters: {lot: this.props.lot}
      })
    }
  }


  render() {

    return(
      <DynamicReportsView
        binmap = {this.state.binmap_struct}
        />
    )
  }
}
