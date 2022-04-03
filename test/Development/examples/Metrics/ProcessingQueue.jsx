import React from 'react';

import moment from 'moment'

import getData from 'apps/Development/examples/getData'

import jsonArray from 'ReactFramework/components/jsonArray'
import Layout from 'apps/Metrics/views/ProcessingQueue/components/Layout'


export default function DevelopmentExample( props ){

  var data = getData('Metric/index.json')
  // data = new jsonArray(jsonArray)
  data.forEach(r => delete r['results'] )
  data = new jsonArray( data )

  var json_array =  data.dt.week('start_time')

  json_array = json_array.filter(r => r.status === 'Pending')

  console.log( props )

  return(
    <div>
      <Layout
        indexData = {json_array}
        />
    </div>
  )


}
