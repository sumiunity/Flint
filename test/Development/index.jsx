
import React, {useState} from 'react';

import DevFramework from 'ReactFramework/components/Frameworks/Development'

// wraps the fixed code documentation framework in the
// grid structure to provide one line per example
export default function DevExamples( props ){

  var config = require('./config.js').config

  return(
    <DevFramework {...props} config={config} />
  )


}
