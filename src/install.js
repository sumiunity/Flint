
const DirectoryManager = require('./components/DirectoryManager').default
const PackageManager = require('./components/PackageManager').default
const ProjectManager = require('./components/ProjectManager').default
const AppNavigation = require('./components/AppNavigation').default
const PageNavigation = require('./components/PageNavigation').default

export default class Install{


    constructor() {
      this.BASE_DIR = process.cwd();
    }

    /**
     * Reads the configuration file, stores it locally within
     * the class and also returns the configuration object
     * @return {Object} Configuration Object
     */
    readConfig(){
      this.config = require(this.BASE_DIR + '/config.json')
      return this.config
    }


    /**
     * Set the root directory path in the config file
     * @return {Object}  Configuration object
     */
    setRoot(){

      if( this.config === undefined ){
        console.log('WARN - configuraiton file not set' )
        return
      }

      // default to use the one level below the current root if
      // the root path is not defined
      if( this.config.root === undefined ){
        var root = process.cwd()
        if( root.includes('\\') ) root = root.split('\\')
        if( root.includes('/') ) root = root.split('/')

        // set the root directory path in the config file
        root = root.splice(0, root.length -1).join('/')
        this.config['root'] = `${root}/${this.config.name}`
      }

      return this.config
    }

    /**
     * Adds the base installation directory to the config file
     */
    setBase(){
      this.config['BASE'] = this.BASE_DIR
    }

    install(){

      this.readConfig()
      this.setRoot()
      this.setBase()

      var dir = new DirectoryManager(this.config)
      dir.install()

      var pkg = new PackageManager(this.config)
      pkg.install()

      var app = new AppNavigation(this.config)
      app.install()

      var page = new PageNavigation(this.config)
      page.install()

      ProjectManager(this.config)
    }

}
