EventManager = require '../../lib/event_manager'
ElementsList = require '../../lib/elements_list'
Element      = require '../../lib/element'

EventManager = require '../../lib/event_manager'
ElementsList = require '../../lib/elements_list'
FSManager    = require '../../lib/fs_manager'
_            = require 'underscore'

updateComponentReferences = (args, cb)->
  availableComponents = ElementsList.get "comps"
  for compName in availableComponents
    args.template = 
      args.template.replace (new RegExp("\{\{\\s*#{compName}\\s*\}\}","g")),"{{ '#{compName}' | component }}"
  cb(null, args)

renderComponent = (name, cb)->
  comp = new Element(name, 'comp')
  ElementsList.addComp comp
  comp.render (e, template)->
    cb null, template unless e?
    cb null, e.message if e?

EventManager.on 'page', 'get_template', updateComponentReferences
EventManager.on 'comp', 'get_template', updateComponentReferences

console.log "Adding component filter"
templateEngine = require '../../lib/template_engine'
templateEngine.addFilter('component', renderComponent, true)