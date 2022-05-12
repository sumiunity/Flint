
const fs = require('fs')
/**
 * Class used to dynamically create the package file
 * based on the configuraiton file. The intention is
 * to install only the necessary packages
 * @author Nik Sumikawa
 */
export default class PackageManager{

  constructor(config) {
    this.config = config
    this.template = require(config.BASE + '/resources/package.json')
  }

  /**
   * Generates the package json object based on the configuration
   * parameters.
   * @return {None}
   */
  install(){

    const config = this.config
    // set the project name and home page based on the project name
    if( config.name !== undefined ){
      this.template['name'] = config.name
      this.template['homepage'] = config.name
    }

    // set the port number so multiple applications can run simultaneously
    if( config.port !== undefined ){
      this.template['scripts']['start'] = `set PORT=${config.port} && react-scripts start`
    }

    // loop through each plugin and add the packages for the enabled ones
    if( config.plugins !== undefined ){
      Object.keys(config.plugins).forEach(name => {
        if( config.plugins[name] === true ){
          this.install_plugins(name)
        }
      })
    }

    // install the plugins needed for the development framework
    if( config.application !== undefined ){
      if( config.application.development === true ){
        this.install_plugins('development')
      }
    }

    // write the package json object to the disk
    this.store()
  }

  /**
   * Adds the package to the specified template
   * @param  {String} pkg         Package name
   * @param  {String} version         Version number
   * @return {Object}                 json object containing package information
   */
  add_package( pkg, version ){
    this.template["dependencies"][pkg] = version
    return this.template
  }

  /**
   * Installs a plugins required for specific functionality
   * @param  {String} name               Functionality Type
   * @return {Object}      json object containing the package information
   */
  install_plugins( name ){

    switch(name) {
      case 'echarts':
        this.add_package('echarts', "^4.7.0")
        this.add_package('echarts-for-react', "^2.0.15-beta.1")
        break;

      case 'material':
        this.add_package('@material-ui/core', "^4.11.0")
        this.add_package('@material-ui/lab', "^4.0.0-alpha.56")
        this.add_package("material-ui-slider", "^3.0.8")
        this.add_package("react-simple-snackbar", "^1.1.10")
        break;

      case 'iframe':
        this.add_package("react-iframe", "^1.8.0")
        break;

      case 'development':
        this.add_package("brace", "^0.11.1")
        this.add_package("react-ace", "^9.2.1")
        break;

      case 'pptx':
        this.add_package("html-to-image", "^1.3.20")
        this.add_package("html2canvas", "^1.0.0-rc.7")
        this.add_package("pptxgenjs", "^3.3.1")
        break;

      case 'other':
        this.add_package("string-similarity", "^4.0.2")
        this.add_package("react-datepicker", "^2.15.0")
        this.add_package("request", "^2.88.2")

        break;

      case 'documentation':

        this.add_package("swagger-ui-react", "^3.26.2")
        break;

      case 'jsonarray':
        this.add_package("jStat", "^1.8.6")
        this.add_package("papaparse", "^5.3.0")
        this.add_package("react-excel-renderer", "^1.1.0")
        break;

      default:
        console.log(`WARN - Feature type not defined - ${name}`)
    }

    return this.template
  }

  /**
   * stores the package json object to the project directory
   * @return {None}
   */
  store(){
    fs.writeFile(
      this.config.root + '/package.json',
      JSON.stringify(this.template, null, 2),
      (err) => {
      if (err) console.log('cannot write file', err);
    });

  }

}
