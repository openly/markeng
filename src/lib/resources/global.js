var config = require('../../config')
  , fs = require('fs')
  , _ = require('underscore')
  ;

var GlobalResources = function(){
  this.getStyleSheets = function(){
    var retval = [];
    _.each(fs.readdirSync(config.dir + '/css'), function(cssFile){
      retval.push('/static/css/' + cssFile);
    });
    retval = _.union(retval, (config.externalCSS || []));
    return retval;
  }
  this.getJavascript = function(){
    var retval = [];
    _.each(fs.readdirSync(config.dir + '/js'), function(cssFile){
      retval.push('/static/js/' + cssFile);
    });
    retval = _.union(retval, (config.externalJS || []));
    return retval;
  }
}

module.exports = new GlobalResources;