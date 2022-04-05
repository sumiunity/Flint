
const fs = require('fs')

/**
 * Class used to generate the project js file based on the contents
 * of the configuration object
 * @type {[type]}
 */
export default class ProjectJsManager{
  constructor(config) {
    this.config = config
  }

  /**
   * Installs the flint code framework and all submodules. The
   * submodule installation is based on the parameters set in
   * the configuraiton file.
   * @return {String} directory path to the project root
   */
  install( ){
      var jsString = ''
      jsString = jsString + "import install from './flint/core/navigation/components/install'" + "\n\n"
      jsString = jsString + "var config = require('./projectConfig.json')" + "\n\n"

      jsString = this.development(jsString)

      this.store(jsString)
  }

  /**
   * Adds the develoment components to the configuration file
   * @return {String} project string
   */
  development(jsString){

    // install the development directory when enabled
    if( this.config.apps !== undefined ){
      if( this.config.apps.development === true ){
        jsString = jsString + "const devConfig = require('apps/Development/navigation').default" + "\n"
        jsString = jsString + "config = install(config, devConfig)" + "\n\n"

      }
    }

    return jsString
  }


  /**
   * stores the project js string to the project src directory
   * @return {None}
   */
  store(jsString){
    jsString = jsString + "export default config"

    fs.writeFile(
      this.config.root + '/src/project.js',
      jsString,
      (err) => {
      if (err) console.log('cannot write file', err);
    });

  }


}
