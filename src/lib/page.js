var fs = require('fs')
  , config = require('../config')
  , _ = require('underscore')
  , hogan = require('hogan.js')
  , ComponentResources = require('./resources/component')
  , components = require('./components')
  , path = require('path')
  ;

var Page = function(){
  function readTemplate(name){
    return fs.readFileSync(path.normalize(config.dir + '/pages/' + name + '/index.html')).toString();
  }

  this.renderPage = function(name){
    addPageResources(name)
    var template = hogan.compile(readTemplate(name));
    return template.render(getComponents(""));
  }

  function addPageResources(name){
    var cssDir = '/pages/'+ name +'/css'
      , jsDir = '/pages/'+ name +'/js';
    if(fs.existsSync(config.dir + cssDir)){
      ComponentResources.addStyleSheets(fs.readdirSync(path.normalize(config.dir + cssDir)), cssDir);
    }
    if(fs.existsSync(config.dir + jsDir)){
      ComponentResources.addJavascript(fs.readdirSync(path.normalize(config.dir + jsDir)), jsDir);
    }
  }

  function getComponents(name){
    var dirs = fs.readdirSync(config.dir + '/comp');
    var obj = {};
    _.each(dirs, function(dir){
      obj[dir] = function(){
        if(dir == name)
          return "Circular reference not allowed.";

        return components.renderComponent(dir);
      }
    });
    return obj;
  }
}

module.exports = new Page();