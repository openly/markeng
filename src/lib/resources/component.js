var _ = require('underscore')
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
      cssResources.push('/static' + dir + '/' + sheet);
    })
  }

  this.addJavascript = function(scripts, dir){
    _.each(scripts,function(script){
      jsResources.push('/static' + dir + '/' + script);
    })
  }

  this.getStyleSheets = function(){ return cssResources; }
  this.getJavascript = function(){ return jsResources; }
}

module.exports = new ComponentResources;