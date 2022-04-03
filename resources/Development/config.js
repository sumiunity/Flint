
function importConfig( config, path, indev=false){

  var localConfig = require('./examples/' + path)

  if( indev === false ){
    for( var i=0; i < localConfig.length; i++ ){
      localConfig[i]['indev'] = false
    }
  }

  return config.concat(localConfig)
}


export var config = []

config = importConfig(config, 'Example/config.json', true)
