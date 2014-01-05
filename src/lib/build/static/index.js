var path = require('path')
  , fs = require('fs')
  , resourceBuilder = require('./resource')
  , pageBuilder = require('./page')
  ;

function MarkupBuilder(){
  var buildDir;

  this.build = function(opDir){
    this.createBuildDir(opDir);
    var assets = this.buildAssets();
    this.buildPages(assets);
  }

  this.createBuildDir = function(opDir){
    var folderName = (new Date()).toISOString();
    createRecursiveDirs(opDir, '/static/' + folderName);
    buildDir = path.normalize(opDir + '/static/' + folderName);
  }

  this.buildAssets = function(){
    return resourceBuilder.build(buildDir);
  }

  this.buildPages = function(assets){
    pageBuilder.build(assets, buildDir);
  }

  function createRecursiveDirs(basePath, dirPath){
    var splitDirs = dirPath.split(/\//)
      , nextDir = path.normalize(basePath + '/' + splitDirs.shift());
    
    if(!fs.existsSync(nextDir)){
      fs.mkdirSync(nextDir);
    }

    if(splitDirs.length >= 1)
      createRecursiveDirs(nextDir, splitDirs.join('/'));
  }
}

module.exports = MarkupBuilder;