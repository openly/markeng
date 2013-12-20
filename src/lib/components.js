var fs = require('fs')
  , config = require('../config')
  , _ = require('underscore')
  , hogan = require('hogan.js')
  , ComponentResources = require('./resources/component')
  , path = require('path')
  ;

var Components = function(){
  function readTemplate(name){
    return fs.readFileSync(path.normalize(config.dir + '/comp/' + name + '/index.html')).toString();
  }

  this.renderComponent = function(name){
    addComponentResources(name)
    var template = hogan.compile(readTemplate(name));
    return template.render(getComponents(name));
  }

  function addComponentResources(name){
    var cssDir = '/comp/'+ name +'/css'
      , jsDir = '/comp/'+ name +'/js';
    if(fs.existsSync(config.dir + cssDir)){
      ComponentResources.addStyleSheets(fs.readdirSync(path.normalize(config.dir + cssDir)), cssDir);
    }
    if(fs.existsSync(config.dir + jsDir)){
      ComponentResources.addJavascript(fs.readdirSync(path.normalize(config.dir + jsDir)), jsDir);
    }
  }

  function getComponents(name){
    var dirs = fs.readdirSync(path.normalize(config.dir + '/comp'));
    var obj = {};
    _.each(dirs, function(dir){
      obj[dir] = function(){
        if(dir == name)
          return "Circular reference not allowed.";

        return theComponents.renderComponent(dir);
      }
    });
    return obj;
  }
}

module.exports = theComponents = new Components();