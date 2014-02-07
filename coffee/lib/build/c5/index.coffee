path = require('path')
FSManager = require('../../fs_manager')
pageBuilder = require('./page')
MarkupBuilder = require('../static')

class C5ThemeBuilder extends MarkupBuilder
  createBuildDir: (opDir)->
    FSManager.rmrf(opDir, '/c5/');
    FSManager.createRecursiveDirs(opDir, '/c5/theme');
    @buildDir = path.normalize(opDir + '/c5/theme');
    
  buildPages: (assets)->
    pageBuilder.build(assets, @buildDir);


module.exports = C5ThemeBuilder;