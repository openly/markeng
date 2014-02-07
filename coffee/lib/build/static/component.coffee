_ = require('underscore')
MarkengComponent = require('../../component')
hogan = require('hogan.js')
MarkengRenderVars = require('../../render_vars')
config = require('../../../config')

StaticComponentManager = {
  allAsFunction: (pageName)->
    retval = {};
    _.map(MarkengComponent.allNames(), (compName)->
      retval[compName] = ()->
        meComp = MarkengComponent.get(compName);
        return (new StaticComponent(meComp)).render(pageName);
    );
    return retval;
}

class StaticComponent 
  constructor: (comp)->
    @comp = comp
  render: (pageName)->
    template = hogan.compile(@comp.getTemplate());
    template.render(_.extend(
      {root_dir: '/', page_dir: '/', comp_dir: '/'},
      StaticComponentManager.allAsFunction(pageName),
      MarkengRenderVars.get(pageName, @comp.name, config.build_tool)
    ));

module.exports = StaticComponentManager;
module.exports.ComponentClass = StaticComponent;