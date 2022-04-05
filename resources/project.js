
import install from './flint/core/navigation/components/install'

var config = require('./project.json')
const devConfig = require('apps/Development/navigation').default

var config = install(projConfig, devConfig)

export default config
