var fs = require('fs')
  , config = require('../config')
  , _ = require('underscore')
  , hogan = require('hogan.js')
  , ComponentResources = require('./resources/component')
  , path = require('path')
  ;

var Components = function(){
  var theComponents = this;
  
  function readTemplate(name){
    return fs.readFileSync(path.normalize(config.dir + '/comp/' + name + '/index.html')).toString();
  }

  this.renderComponent = function(name){
    ComponentResources.addForComponent(name)
    var template = hogan.compile(readTemplate(name));
    return template.render(getComponents(name));
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

module.exports = new Components();