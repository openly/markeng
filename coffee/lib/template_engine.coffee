nunjucks     = require 'nunjucks'
config       = require '../config'
path         = require 'path'
EventManager = require './event_manager'


env = nunjucks.configure(path.normalize("#{config.dir}/macros"),{autoescape:false});

module.exports = env