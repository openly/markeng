fs           = require 'fs'
path         = require 'path'
async        = require 'async'
path         = require 'path'
config       = require '../config'
eventManager = require './event_manager'
FSManager    = require './fs_manager'
AssetRender  = require './asset_render'

class Element
  constructor: (@name, @elementType) ->
    @elementDir = "/#{@elementType}s/#{@name}"

  getTemplate: (callback)->
    fs.readFile path.normalize("#{config.dir}/#{@elementDir}") + "/index.html", (e, data)=>
      return callback(null, "#{@elementType} \"#{@name}\" not found") if e
      @raiseEvent 'get_template', template: data.toString(), (e, vars)->
        callback e, vars.template

  render: (callback)->
    @getTemplate (e, template)=>
      @raiseEvent 'render', template: template, (e, args)=>
        templateEngine = require './template_engine'
        templateEngine.renderString template, args, callback

  title: (callback)->
    callback null, "#{config.title} :: #{@name} #{@elementType}"

  css: (callback)->
    @raiseEvent 'get_css', {}, (e, args)->
      if args.css instanceof Array
        callback e, AssetRender.css(args.css) 
      else if args.css instanceof String
        callback e, AssetRender.css([args.css])
      else
        callback e, '<!-- No CSS Files -->'

  js: (callback)->
    @raiseEvent 'get_js', {}, (e, args)->
      callback e, AssetRender.js(args.js) if args.js instanceof Array
      callback e, '<!-- No JS Files -->' unless args.js instanceof Array

  raiseEvent: (eventName, args, callback)->
    eventManager.raiseEvent(@elementType, eventName, @, args, callback)

module.exports = Element