
const ProjectJsonManager = require('./ProjectJsonManager').default
const ProjectJsManager = require('./ProjectJsManager').default

export default function install( config ){

  // install the project json file into the src directory
  const jsonManager = new ProjectJsonManager(config)
  jsonManager.install()

  // // install the project js file into the src directory
  // const jsManager = new ProjectJsManager(config)
  // jsManager.install()

}
