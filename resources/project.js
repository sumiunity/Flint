
import install from './flint/core/navigation/components/install'


var config = {
  homepage: 'Flint',
  project_name: 'Flint',
  project_group: 'Flint',
  logo: '/icon.png',
  Components: [],
  examples: true,
  media: 'http://localhost:8000/rest/api/v0/media',
  authentication:{
    name: 'auth', //user information is stored in the brower cache under this name
    enable: false,
    host: 'http://localhost:8000',
    url: {

    }
  },
  restapi:{
    host: {
      rest: 'localhost:8000/rest/api/v0',
    },

    url: {
      test : {url: '/test/index', host: 'rest'},

    }

  }
}

const devConfig = require('apps/Development/navigation').default
config = install(config, devConfig)



export default config
