var config = require('../../config')
  , _ = require('underscore')
  , hogan = require('hogan.js')
  , Assets = require('../assets')
  , MarkengRenderVars = require('../render_vars')
  , path = require('path')
  ;

var ComponentRenderable = function (component, callStack, isRootComp) {
  var MarkengComponent = require('../component')
    , MarkengPage = require('../page');

  this.stylesheets = function(){
    var compCSS = _.map(MarkengComponent.currentObjs, function(comp){
      return comp.getComponentCSS();
    });
    compCSS = _.flatten(compCSS);
    return Assets.renderCSS(_.union(Assets.globalCSS(), compCSS)) + getLessDependencies();
  }

  this.scripts = function(){
    var compJS = _.map(MarkengComponent.currentObjs, function(comp){
      return comp.getComponentJS();
    });
    compJS = _.flatten(compJS);
    return Assets.renderJS(_.union(Assets.globalJS(), compJS));
  }

  // Variables for rendering
  this.title = config.title + " :: " + component.displayName + " Component";
  this.main = getMain();

  function getMain(){
    var template = hogan.compile(component.getTemplate());

    return template.render(_.extend(
        {
          'root_dir': '/static/',
          'page_dir': path.normalize('/static/pages/' + MarkengPage.current),
          'comp_dir': path.normalize('/static/' + component.componentRelDir())
        },
        MarkengComponent.allAsFunction(callStack),
        MarkengRenderVars.get(MarkengPage.current, component.name),
        {abhi:function(name){ return "Name: " + name; }}
    ));
  }

  function getLessDependencies(){
    var lessStylesheets = Assets.globalLESS();
    var compLESS = _.map(MarkengComponent.currentObjs, function(comp){
      return comp.getComponentLESS();
    });
    compLESS = _.flatten(compLESS);
    return Assets.renderCSS(_.union(lessStylesheets, compLESS)) 
  }
}

module.exports = ComponentRenderable;