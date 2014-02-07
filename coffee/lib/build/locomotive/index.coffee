path = require('path')
FSManager = require('../../fs_manager')
pageBuilder = require('./page')
MarkupBuilder = require('../static')
resourceBuilder = require('../static/resource')

class LocomotiveThemeBuilder extends MarkupBuilder
  createBuildDir: (opDir)->
    FSManager.rmrf(opDir, '/locomotive/');
    FSManager.createRecursiveDirs(opDir, '/locomotive/public');
    FSManager.createRecursiveDirs(opDir, '/locomotive/app/views/pages');
    @buildDir = path.normalize(opDir + '/locomotive/public');

  buildAssets: ()->
    resourceBuilder.build(@buildDir, @buildStaticVersion,{css:"stylesheets",js:"javascripts"});

  buildPages: (assets)->
    pageBuilder.build(assets, @buildDir + '/../app/views/pages');


module.exports = LocomotiveThemeBuilder;