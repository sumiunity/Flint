
import Examples from './index'


var config = {
  Components:[
    {
      // menu: 'Development',
      name: 'Development',
      path:'/Development',
      component: Examples,
      auth: 'public',
      // show: true,
    }
  ],
  restapi:{
    host: {},
    url: {}
  }
}

export default config;
