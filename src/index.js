global.base_dir = './';

global.abs_path = function(path) {
  return base_dir + path;
}

global.include = function(file) {
  return require(abs_path('/' + file));
}

// import hello from './src/test'
// import hello from 'test'
include( 'test.js')
console.log( 'test123' )