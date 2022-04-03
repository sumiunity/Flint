var fs = require('fs');
var path = require('path');

function copyFileSync( source, target ) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target, basename ) {
    var files = [];

    // remove the original src basename
    var targetFolder = path.join( target, path.basename( source ) );
    if(basename === path.basename(source)) targetFolder = target;

    // Check if folder needs to be created or integrated
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder, basename );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

function copy(source, target){
  const basename = path.basename( source )
  copyFolderRecursiveSync(source, target, basename)

}

export default copy
