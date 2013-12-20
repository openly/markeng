var config = require('../../config')
  , fs = require('fs')
  , _ = require('underscore')
  , page = require('../page')
  , ComponentResources = require('../resources/component')
  , GlobalResources = require('../resources/global')
  , ResourceRender = require('../resources/render')
;

var PageRenderEngine = function(pageName){
  this.renderTo = function(target, params, callback){
    var obj = {
      "stylesheets" : getRequiredStylesheets, // execute functions later :)
      "scripts"     : getRequiredScripts,
      "title"       : getTitle(),
      "main"        : getPageMarkup()
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
    return config.title + " :: " + pageName;
  }

  function getPageMarkup(){
    ComponentResources.reset();
    return page.renderPage(pageName);
  }
}


module.exports = PageRenderEngine;