path = require('path')
FSManager = require('../../fs_manager')
resourceBuilder = require('./resource')
pageBuilder = require('./page')
md5 = require('MD5')

class MarkupBuilder
  constructor: ()->
    @buildStaticVersion = md5((new Date()).toISOString());

  build: (opDir)->
    @createBuildDir(opDir);
    assets = @buildAssets();
    @buildPages(assets);

  createBuildDir: (opDir)->
    FSManager.rmrf(opDir, '/static/');
    FSManager.createRecursiveDirs(opDir, '/static/');
    @buildDir = path.normalize(opDir + '/static/');

  buildAssets: ()->
    resourceBuilder.build(@buildDir, @buildStaticVersion);

  buildPages: (assets)->
    pageBuilder.build(assets, this.buildDir);

module.exports = MarkupBuilder;