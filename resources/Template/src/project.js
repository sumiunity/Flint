
import install from './flint/core/navigation/components/install'

var projConfig = require('./projectConfig.json')
const appConfig = require('application/navigation').default

var config = install(projConfig, appConfig)

export default config
