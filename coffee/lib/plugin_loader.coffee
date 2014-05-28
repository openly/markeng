_ = require 'underscore'
defaultPlugins = [ 'component', 'css', 'js' ]

module.exports.load = LoadPlugins = ()->
  config = require '../config'

  config.plugins = [] unless config.plugins instanceof Array

  reqPlugins = _.union defaultPlugins, config.plugins

  for plugin in reqPlugins
    console.log "Loading #{plugin} plugin."
    require "../plugins/#{plugin}" if plugin.indexOf(".") is -1
    if plugin.indexOf(".") isnt -1
      [ module, file ] = plugin.split('.')
      require "#{module}/#{file}"