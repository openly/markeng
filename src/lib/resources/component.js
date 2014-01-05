var _ = require('underscore')
  , fs = require('fs')
  , path = require('path')
  , config = require('../../config')
  ;
var ComponentResources = function(){
  var jsResources = []
    , cssResources = [];

  this.reset = function(){
    jsResources = [];
    cssResources = [];
  }

  this.addStyleSheets = function(sheets, dir){
    _.each(sheets,function(sheet){
      if(/\.css/.test(sheet))
        cssResources.push('/static' + dir + '/' + sheet);
    })
  }

  this.addJavascript = function(scripts, dir){
    _.each(scripts,function(script){
      if(/\.js/.test(script))
        jsResources.push('/static' + dir + '/' + script);
    })
  }

  this.getStyleSheets = function(){ return cssResources; }
  this.getJavascript = function(){ return jsResources; }

  this.addForComponent = function(componentName){
    var cssDir = '/comp/'+ componentName +'/css'
      , jsDir = '/comp/'+ componentName +'/js';
    if(fs.existsSync(config.dir + cssDir)){
      this.addStyleSheets(fs.readdirSync(path.normalize(config.dir + cssDir)), cssDir);
    }
    if(fs.existsSync(config.dir + jsDir)){
      this.addJavascript(fs.readdirSync(path.normalize(config.dir + jsDir)), jsDir);
    }
  }

  this.addForPage = function(pageName){
    var cssDir = '/pages/'+ pageName +'/css'
      , jsDir = '/pages/'+ pageName +'/js';
    if(fs.existsSync(config.dir + cssDir)){
      this.addStyleSheets(fs.readdirSync(path.normalize(config.dir + cssDir)), cssDir);
    }
    if(fs.existsSync(config.dir + jsDir)){
      this.addJavascript(fs.readdirSync(path.normalize(config.dir + jsDir)), jsDir);
    }
  }
}

module.exports = new ComponentResources;