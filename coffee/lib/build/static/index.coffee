path = require('path')
FSManager = require('../../fs_manager')
resourceBuilder = require('./resource')
pageBuilder = require('./page')
md5 = require('MD5')

class MarkupBuilder
  constructor: ()->
    @buildStaticVersion = md5((new Date()).toISOString());

  build: (opDir)->
    self = @
    @createBuildDir(opDir);
    @buildAssets((assets)->
      self.buildPages(assets);
    );

  createBuildDir: (opDir)->
    FSManager.rmrf(opDir, '/static/');
    FSManager.createRecursiveDirs(opDir, '/static/');
    @buildDir = path.normalize(opDir + '/static/');

  buildAssets: (cb)->
    resourceBuilder.build(@buildDir, @buildStaticVersion, null, cb);

  buildPages: (assets)->
    pageBuilder.build(assets, this.buildDir);

module.exports = MarkupBuilder;