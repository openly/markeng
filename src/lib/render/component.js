var config = require('../../config')
  , fs = require('fs')
  , _ = require('underscore')
  , components = require('../components')
  , ComponentResources = require('../resources/component')
  , GlobalResources = require('../resources/global')
  , ResourceRender = require('../resources/render')
;

var ComponentRenderEngine = function(componentName){
  this.renderTo = function(target, params, callback){
    var obj = {
      "stylesheets" : getRequiredStylesheets, // execute functions later :)
      "scripts"     : getRequiredScripts,
      "title"       : getTitle(),
      "main"        : getComponentMarkup()
    };
    target.render("component",obj)
  }

  function getRequiredStylesheets(){
    var styles = _.union(GlobalResources.getStyleSheets(), ComponentResources.getStyleSheets())
    return ResourceRender.renderCSS(styles);
  }

  function getRequiredScripts(){
    var scripts = _.union(GlobalResources.getJavascript(), ComponentResources.getJavascript())
    return ResourceRender.renderJS(scripts);
  }

  function getTitle(){
    return config.title + " :: (" + componentName + " Component)";
  }

  function getComponentMarkup(){
    ComponentResources.reset();
    return components.renderComponent(componentName);
  }
}


module.exports = ComponentRenderEngine;