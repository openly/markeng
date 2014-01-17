var _ = require('underscore')
  , MarkengComponent = require('../../component')
  , hogan = require('hogan.js')
  ;

var StaticComponentManager = {
  allAsFunction: function(){
    var retval = {};
    _.map(MarkengComponent.allNames(), function(compName){
      retval[compName] = function(){
        var meComp = MarkengComponent.get(compName);
        return (new StaticComponent(meComp)).render();
      }
    });
    return retval;
  }
}

var StaticComponent = function(comp){
  this.render = function(){
    var template = hogan.compile(comp.getTemplate());
    return template.render(_.extend(
      {root_dir: '/', page_dir: '/', comp_dir: '/'},
      StaticComponentManager.allAsFunction()
    ));
  }
}

module.exports = StaticComponentManager;