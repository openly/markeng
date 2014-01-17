var config = require('../config')
  , _ = require('underscore')
  , FSManager = require('./fs_manager')
  , MarkengComponent = require('./component')
  , PageRenderable = require('./renderable/page')
  ;

var MarkengPageManager = {
  current: null,
  get: function(name){
    MarkengPageManager.current = name;
    return new MarkengPage(name);
  },
  all: function(){
    var pageNames = FSManager.getDirContents('pages');
    return _.map(pageNames, this.get);
  },
  allNames: function(){
    return FSManager.getDirContents('pages');
  }
}

function MarkengPage(name){
  var pageDir = '/pages/' + name + '/'
    , page = this
    , renderable
    ;

  this.name = name;
  this.dir = pageDir;

  this.getPageJS = function(){ 
    return pagePathFor(FSManager.getDirContents(pageDir + 'js/', /\.js$/i), 'js/');
  }
  this.getPageCSS = function(){ 
    return pagePathFor(FSManager.getDirContents(pageDir + 'css/', /\.css$/i), 'css/');
  }
  this.getOtherAssets = function(){ return FSManager.getDirContentsRecursive(pageDir,null,['css','js',/\.html?$/]); }
  this.getTemplate = function(){ return FSManager.readFile(pageDir + 'index.html'); }
  this.pageRelDir = function(){ return pageDir; }
  this.getReferedComps = function(){ return MarkengComponent.currentObjs; }
  this.getRenderable = function(){ 
    if(typeof renderable == 'undefined')
      renderable =  new PageRenderable(this);
    return renderable; 
  }

  function pagePathFor(items, subdir){
    if(_.isString(items)) return pageDir + subdir + items;
    if(_.isArray(items)){
      return _.map(items, function(item){ return pageDir + subdir + item; })
    }
    else{
      var retval = {};
      _.map(items, function(item, name){
        var newName = pageDir + subdir + name;
        retval[newName] = item;
      })
      return retval;
    }
  }
}


module.exports = MarkengPageManager;