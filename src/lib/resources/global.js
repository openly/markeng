var config = require('../../config')
  , fs = require('fs')
  , _ = require('underscore')
  ;

var GlobalResources = function(){
  this.getStyleSheets = function(){
    var retval = [];
    _.each(fs.readdirSync(config.dir + '/css'), function(cssFile){
      if(cssFile.match(/\.css$/))
        retval.push('/static/css/' + cssFile);
    });
    retval = _.union((config.externalCSS || []), retval);
    return retval;
  }
  this.getJavascript = function(){
    var retval = [];
    _.each(fs.readdirSync(config.dir + '/js'), function(cssFile){
      if(cssFile.match(/\.js$/))
        retval.push('/static/js/' + cssFile);
    });
    retval = _.union((config.externalJS || []), retval);
    return retval;
  }
}

module.exports = new GlobalResources;