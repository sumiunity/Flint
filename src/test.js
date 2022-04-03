
const Installer = require('./install.js').default

export function hello(){
    console.log('helloworld')
    }

//

// var dir = new DirectoryManager(config)
// dir.install( config )
// dir.initialize_git()
// dir.add_flint()
// dir.add_development()

const installer = new Installer()
installer.install()

// console.log( packages.template)
//
// var packages = new PackageManager()
// packages.install( config )
// console.log( packages.template)

// console.log( packages.readTemplate() )
// const fs = require('fs')
// const dirPath = '/Users/niksumikawa/Dev/work/dev/filesystem/test'
// fs.mkdirSync(dirPath, { recursive: true })
//
// console.log(config)
//
// console.log( process.cwd() )
// const copy = require('./components/copy.js').default
// copy( BASE_DIR + '/resources/Development', BASE_DIR + '/test')

/// create directory
/// add submodules
/// copy over project file
/// add packages (package manager)
/// create apps directory
