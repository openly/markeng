var _ = require('underscore')
  , path = require('path')
  , sys = require('sys')
;

module.exports.compileAll = function(){
    var FSManager = require('../fs_manager')
      , config = require('../../config')
    ;
    var allFiles = getPath (FSManager.getDirContentsRecursive('/'), config.dir);

    var lessFiles = _.filter(allFiles, function(file){
        return /\.less$/i.test(file);
    })
    _.each(lessFiles, function(lessFile){
        var cssFile = lessFile.replace(/\.less$/i,'.css');

        console.log('Converting: ' + lessFile + ' - to - ' + cssFile);

        var cmd = "lessc " + lessFile + " > " + cssFile;

        var exec = require('child_process').exec;
        exec(cmd, puts);

    })
}

function puts(error, stdout, stderr) {  }

function getPath(files, basePath){
    basePath = path.normalize(basePath);

    var retval = [];
    _.each(files, function(contents, name){
        if(_.isObject(contents)){
            var subFiles = getPath(contents, basePath + '/' + name);
            _.each(subFiles,function(subFile){ retval.push(subFile); });
        }
        retval.push(basePath + '/' + name);
    });

    return retval;
}