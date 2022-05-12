
const fs = require('fs')
const copy = require('./copy.js').default
const shell = require('shelljs')

export default class DirectoryManager{
  constructor(config) {
    console.log( config)
    this.config = config
    this.BASE_DIR = process.cwd();
  }

  /**
   * Installs the flint code framework and all submodules. The
   * submodule installation is based on the parameters set in
   * the configuraiton file.
   * @return {String} directory path to the project root
   */
  install( ){
      this.createRootDir()

      // create and initialize a local git repository
      // this is needed to add the flint submodule
      this.initialize_git()

      this.add_flint()

      // install the application pages when enabled
      this.add_pages()

      // install the development directory when enabled
      this.add_development()
  }

  /**
   * Creates the root directory. Uses the "root" directory
   * in the config file. If it doesn't exists, the file is
   * created one level below the root of this project directory
   * @param  {Object} config               configuration object
   * @return {None}
   */
  createRootDir(){
    // use the root directory in the config file
    var root = this.config.root

    // default to use the one level below the current root if
    // the root path is not defined
    if( root === undefined ){
      root = process.cwd()
      if( root.includes('\\') ) root = root.split('\\')
      if( root.includes('/') ) root = root.split('/')
      root = root.splice(0, root.length -1).join('/')
      root = `${root}/${this.config.name}`

      // set the the root directory path in the configuration file
      this.config['root'] = root
    }

    const source = this.BASE_DIR + '/resources/TEMPLATE'
    copy( source, root)

  }

  /**
   * Initializes a local git repository and adds the project
   * template. This is needed so the submodules can be added
   * to the code
   * @return {None}
   */
  initialize_git(){

    shell.cd(this.config.root)
    shell.exec('git init')
    shell.exec('git add -A')
    shell.exec('git commit -m "0.0.0 - created project"')
  }

  /**
   * Add the flint template as a submodule. Also initialize all
   * submodules within the flint template
   */
  add_flint(){
    // add the flint submodule
    shell.cd(this.config.root)
    shell.exec('git submodule add https://github.com/sumiunity/Flint.git src/flint')

    // change to the code branch
    shell.cd(this.config.root + '/src/flint')
    shell.exec('git checkout code')

    // initialize the submodules
    shell.exec('git submodule init')
    shell.exec('git submodule update')

  }


  /**
   * Adds templates for each of the specified pages
   */
  add_pages(){

    const source = this.BASE_DIR + '/resources/Page'
    const target = this.config.root + '/src/application'

    // return when the pages field is not enabled
    if( this.config.application === undefined ) return
    if( this.config.application.pages === undefined ) return
    if( this.config.application.pages.enable !== true ) return

    this.config.application.pages.names.forEach(page => {
      const temp = target + `/${page}`
      console.log( 'creating page', source, temp)

      // create the directory tree for the target
      fs.mkdirSync(temp, { recursive: true })

      // copy the contents into the target directory
      copy( source, temp)
    })
  }

  /**
   * Adds the development framework to the project
   */
  add_development(){
    const source = this.BASE_DIR + '/resources/Development'
    const target = this.config.root + '/src/application/Development'

    // return when the development flag is not set
    if( this.config.application === undefined ) return
    if( this.config.application.development !== true ) return


    // create the directory tree for the target
    fs.mkdirSync(target, { recursive: true })

    // copy the contents into the target directory
    copy( source, target)
  }



}
