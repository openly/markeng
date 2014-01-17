var path = require('path')
  , FSManager = require('../../fs_manager')
  , resourceBuilder = require('./resource')
  , pageBuilder = require('./page')
  , md5 = require('MD5')
  ;

function MarkupBuilder(){
  var buildDir
    , buildStaticVersion = md5((new Date()).toISOString());

  this.build = function(opDir){
    this.createBuildDir(opDir);
    var assets = this.buildAssets();
    this.buildPages(assets);
  }

  this.createBuildDir = function(opDir){
    FSManager.rmrf(opDir, '/static/');
    FSManager.createRecursiveDirs(opDir, '/static/');
    buildDir = path.normalize(opDir + '/static/');
  }

  this.buildAssets = function(){
    return resourceBuilder.build(buildDir, buildStaticVersion);
  }

  this.buildPages = function(assets){
    pageBuilder.build(assets, buildDir);
  }

}

module.exports = MarkupBuilder;