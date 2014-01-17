var FSManager = require('./fs_manager')
  , _ = require('underscore')
  , hogan = require('hogan.js')
  , config = require('../config')
;
var Assets = {
  globalCSS: function(){ 
    var global = _.map(FSManager.getDirContents('css/',/\.css$/i),function(css){
      return '/css/' + css;
    });
    return _.union((config.externalCSS || []), global);
  },
  globalJS: function(){
    var global = _.map(FSManager.getDirContents('js/',/\.js$/i),function(js){
      return '/js/' + js;
    });
    return _.union((config.externalJS || []), global);
  },
  globalOtherAssets: function(){
    return FSManager.getDirContentsRecursive('',null,['css','js', 'comp', 'pages','build', /\.json?$/]);
  },
  renderJS: function(scripts, forBuild){
    if(!forBuild)
      scripts = attachRelPath(scripts);
    var templateStr = "{{#scripts}}<script type=\"text/javascript\" src=\"{{.}}\"></script>\n{{/scripts}}"
    var template = hogan.compile(templateStr);
    return template.render({scripts: scripts});
  },
  renderCSS: function(styleSheets, forBuild){
    if(!forBuild)
      styleSheets = attachRelPath(styleSheets);
    var templateStr = "{{#styleSheets}}<link rel=\"stylesheet\" href=\"{{.}}\">\n{{/styleSheets}}"
    var template = hogan.compile(templateStr);
    return template.render({styleSheets: styleSheets});
  }
};

function attachRelPath(items){
  return _.map(items, function(item){ 
    return /^https?:\/\//.test(item) || /^\/\//.test(item) ? item : ('/static' + item);
  });
}

module.exports = Assets;