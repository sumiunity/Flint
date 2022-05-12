global.base_dir = './';

global.abs_path = function(path) {
  return base_dir + path;
}

global.include = function(file) {
  return require(abs_path('/' + file));
}


const Installer = require('./install.js').default
const install = new Installer()
install.install()

console.log( 'Complete' )
