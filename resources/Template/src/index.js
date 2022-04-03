import React from 'react';
import ReactDOM from 'react-dom';

import Flint from './flint'
import projConfig from './project'

import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
  <Flint projConfig={projConfig}/>,
  document.getElementById('root')
);
