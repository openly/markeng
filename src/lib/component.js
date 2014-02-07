var FSManager = require('./fs_manager')
  , _ = require('underscore')
  , hogan = require('hogan.js')
  , path = require('path')
  , ComponentRenderable = require('./renderable/component')
;
var MarkengComponentManager = {
    current: [],
    currentObjs: [],
    reset: function(){ 
        MarkengComponentManager.current = [];
        MarkengComponentManager.currentObjs = [];
    },
    all: function(){
      var compNames = FSManager.getDirContents('comp');
      return _.map(compNames, this.get);
    },
    allNames: function(){
      return FSManager.getDirContents('comp');
    },
    get: function(name, callStack){
        if(!(callStack instanceof Array)) callStack = [];

        var meComp = new MarkengComponent(name, callStack);

        if(_.indexOf(MarkengComponentManager.current, name) == -1) {
            MarkengComponentManager.current.push(name);
            MarkengComponentManager.currentObjs.push(meComp);
        }
        return meComp;
    },
    allAsFunction: function(callStack){
        var compNames = FSManager.getDirContents('/comp');
        var retVal = {};
        _.each(compNames, function(comp){
            retVal[comp] = function(){ 
                return MarkengComponentManager.get(comp, callStack).getRenderable().main;
            };
        })
        return retVal;
    },
}

var MarkengComponent = function(name, callStack){
    var compDir = '/comp/' + name + '/'
      , myCallStack = _.clone(callStack)
      , comp = this
      , renderable 
    ;
    myCallStack.push(name);

    this.displayName = name.replace(/[_\W]/,' ');
    this.displayName = this.displayName.charAt(0).toUpperCase() + this.displayName.substr(1);
    this.name = name;

    this.getRenderable = function(rootComp){
      if(typeof renderable == 'undefined')
        renderable =  new ComponentRenderable(this, myCallStack, rootComp);
      return renderable;
    }

    this.getTemplate = function(){ 
      if(_.indexOf(callStack, name) != -1){
        return "Circular refrence to component: " + name;
      }
      return FSManager.readFile(compDir + 'index.html'); 
    }
    
    this.getComponentJS = function(){ 
      return compPathFor(FSManager.getDirContents(compDir + 'js/', /\.js$/i), 'js/');
    }
    this.getComponentCSS = function(){ 
      return compPathFor(FSManager.getDirContents(compDir + 'css/', /\.css$/i), 'css/');
    }
    this.getOtherAssets = function(){ return FSManager.getDirContentsRecursive(compDir,null,['css','js',/\.html?$/,/^data.*json$/]); }
    this.componentRelDir = function(){ return compDir; }

    function compPathFor(items, subdir){
      if(_.isString(items)) return compDir + subdir + items;
      if(_.isArray(items)){
        return _.map(items, function(item){ return compDir + subdir + item; })
      }
      else{
        var retval = {};
        _.map(items, function(item, name){
          var newName = compDir + subdir + name;
          retval[newName] = item;
        })
        return retval;
      }
    }
}

module.exports = MarkengComponentManager;