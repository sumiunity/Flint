import React from 'react';

import moment from 'moment'

import getData from 'apps/Development/examples/getData'

import jsonArray from 'ReactFramework/components/jsonArray'
import Layout from 'ReactFramework/components/Core/views/UsageMetrics/Layout'

export default function DevelopmentExample( props ){

  var data = getData('Metric/index.json')
  // data = new jsonArray(jsonArray)
  data.forEach(r => delete r['results'] )
  data = new jsonArray( data )

  var json_array =  data.dt.week('start_time')

  var stack_col = 'status'

  // create a pivot table so there is a unique column for each
  // category you wish to stack (CATEGORY2 in this case)
  var pivot = json_array.pivot_table('WEEK_LABEL', stack_col, 'count')

  // retrieve the unique values for column you wish to stack
  const stacked_id = json_array.unique(stack_col)

  return(
    <div>
      <pivot.react.echarts.Bar
        colx = 'row'
        coly = {stacked_id}
        stacked = {true}
        />
    </div>
  )


}
