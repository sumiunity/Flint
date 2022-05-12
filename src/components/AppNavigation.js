
const fs = require('fs')

/**
 * Class used to generate the application navigation configuration object
 * @type {[type]}
 */
export default class ApplicationNavigation{
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
      jsString = jsString + "import install from '../flint/core/navigation/components/install'" + "\n\n"
      jsString = jsString + "var config = {}" + "\n\n"

      jsString = this.pages(jsString)

      jsString = this.development(jsString)

      this.store(jsString)
  }

  /**
   * Adds the application pages
   * @return {String} project string
   */
  pages(jsString){

    // install the page template for the specified pages 
    if( this.config.application !== undefined ){
      if( this.config.application.pages !== undefined ){
        if( this.config.application.pages.enable === true ){
          this.config.application.pages.names.forEach( page => {
            jsString = jsString + `const ${page}Config = require('application/${page}/navigation').default\n`
            jsString = jsString + `config = install(config, ${page}Config)\n\n`
          })

        }
      }
    }

    return jsString
  }

  /**
   * Adds the develoment components to the configuration file
   * @return {String} project string
   */
  development(jsString){

    // install the development directory when enabled
    if( this.config.application !== undefined ){
      if( this.config.application.development === true ){
        jsString = jsString + "const devConfig = require('application/Development/navigation').default" + "\n"
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
      this.config.root + '/src/application/navigation.js',
      jsString,
      (err) => {
      if (err) console.log('cannot write file', err);
    });

  }


}
