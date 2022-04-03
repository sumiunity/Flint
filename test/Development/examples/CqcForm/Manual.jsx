import React from 'react';

import moment from 'moment'

// import getData from 'apps/Development/examples/getData'

import CqcForm from 'apps/CqcOutlierAnalysis/components/CqcForm/components/Layout/Manual'


export default function DevelopmentExample( props ){

  // var data = getData('Metric/index.json')

  console.log( props )
  return(
    <div>
      <CqcForm
        {...props}
        incidentNum = {'123456A'}
        product = {'TESTPROD'}
        dutType = {5}
        lot = {'LOT1234'}
        wafer = {1}
        dieX = {2}
        dieY = {3}
        />
    </div>
  )


}
