var config = require('../../config')
  , _ = require('underscore')
  , hogan = require('hogan.js')
  , Assets = require('../assets')
  , MarkengComponent = require('../component')
  , MarkengRenderVars = require('../render_vars')
  , path = require('path')
  , customHead = require('../custom_head')
  ;

var PageRenderable = function (page) {
  this.stylesheets = function(){
    var stylesheets = _.union( Assets.globalCSS(), page.getPageCSS() );
    var compCSS = _.map(page.getReferedComps(), function(comp){
      return comp.getComponentCSS();
    });
    compCSS = _.flatten(compCSS);
    return Assets.renderCSS(_.union(stylesheets, compCSS)) + getLessDependencies();
  }

  this.scripts = function(){
    var scripts = _.union( Assets.globalJS(), page.getPageJS() );
    var compJS = _.map(page.getReferedComps(), function(comp){
      return comp.getComponentJS();
    });
    compJS = _.flatten(compJS);
    return Assets.renderJS(_.union(scripts, compJS));
  }

  // Variables for rendering
  this.title = config.title + " :: " + page.name;
  this.main = getMain();
  this.custom_head = customHead.get();

  function getMain(){
    MarkengComponent.reset();
    
    var template = hogan.compile(page.getTemplate());
    return template.render(_.extend(
        {
          'root_dir': '/static/',
          'page_dir': '/static/' + page.pageRelDir() 
        }, 
        MarkengComponent.allAsFunction(),
        MarkengRenderVars.get(page.name)
    ));
  }

  function getLessDependencies(){
    var lessStylesheets = _.union( Assets.globalLESS(), page.getPageLESS() );
    var compLESS = _.map(page.getReferedComps(), function(comp){
      return comp.getComponentLESS();
    });
    compLESS = _.flatten(compLESS);
    return Assets.renderCSS(_.union(lessStylesheets, compLESS)) 
  }
}

module.exports = PageRenderable;