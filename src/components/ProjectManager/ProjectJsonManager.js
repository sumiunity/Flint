
const fs = require('fs')

/**
 * Class used to generate the project file based on the contents
 * of the configuration object
 * @type {[type]}
 */
export default class ProjectJsonManager{
  constructor(config) {
    this.config = config
  }

  /**
   * Reads the project json template and populates it based
   * on the contents of the configuration object
   */
  install( ){

    var projConfig = require(this.config.BASE + '/resources/project.json')
    projConfig =this.homepage(projConfig)
    projConfig =this.project_group(projConfig)
    projConfig =this.project_name(projConfig)
    projConfig =this.authentication(projConfig)

    this.store(projConfig)
  }

  /**
   * Updates the project configuration homepage
   * @param  {OBJECT} projConfig               Project Configuration Object
   * @return {OBJECT}            updated Proejct Configuration
   */
  homepage(projConfig){
      projConfig['homepage'] = this.config.name
      return projConfig
  }

  /**
   * Updates the project configuration project name
   * @param  {OBJECT} projConfig               Project Configuration Object
   * @return {OBJECT}            updated Proejct Configuration
   */
  project_name(projConfig){
      projConfig['project_name'] = this.config.name
      return projConfig
  }

  /**
   * Updates the project configuration project group
   * @param  {OBJECT} projConfig               Project Configuration Object
   * @return {OBJECT}            updated Proejct Configuration
   */
  project_group(projConfig){
      projConfig['project_group'] = this.config.name
      return projConfig
  }

  /**
   * Updates the authentication enable based on the configuration parameters
   * @param  {OBJECT} projConfig               Project Configuration Object
   * @return {OBJECT}            updated Proejct Configuration
   */
  authentication(projConfig){
    var enable = this.config.authentication
    if(enable === undefined) enable = false

    projConfig.authentication.enable = enable

    return projConfig
  }

  /**
   * stores the project json object to the project src directory
   * @return {None}
   */
  store(projConfig){
    fs.writeFile(
      this.config.root + '/src/projectConfig.json',
      JSON.stringify(projConfig, null, 2),
      (err) => {
      if (err) console.log('cannot write file', err);
    });

  }


}
