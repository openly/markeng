// Generated by CoffeeScript 1.6.3
var MarkengComponent, MarkengRenderVars, StaticComponent, StaticComponentManager, config, hogan, _;

_ = require('underscore');

MarkengComponent = require('../../component');

hogan = require('hogan.js');

MarkengRenderVars = require('../../render_vars');

config = require('../../../config');

StaticComponentManager = {
  allAsFunction: function(pageName) {
    var retval;
    retval = {};
    _.map(MarkengComponent.allNames(), function(compName) {
      return retval[compName] = function() {
        var meComp;
        meComp = MarkengComponent.get(compName);
        return (new StaticComponent(meComp)).render(pageName);
      };
    });
    return retval;
  }
};

StaticComponent = (function() {
  function StaticComponent(comp) {
    this.comp = comp;
  }

  StaticComponent.prototype.render = function(pageName) {
    var template;
    template = hogan.compile(this.comp.getTemplate());
    return template.render(_.extend({
      root_dir: '/',
      page_dir: '/',
      comp_dir: '/'
    }, StaticComponentManager.allAsFunction(pageName), MarkengRenderVars.get(pageName, this.comp.name, config.build_tool)));
  };

  return StaticComponent;

})();

module.exports = StaticComponentManager;

module.exports.ComponentClass = StaticComponent;
