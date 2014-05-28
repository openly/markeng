_     = require 'underscore'
async = require 'async'

class EventManager
  constructor: () ->
    @events = []
  
  on: (type, event, handler) -> 
    @events.push
      type    : type
      event   : event
      handler : handler

  handlersFor: (type, event) ->
    filtered = _.filter @events, (e)-> e.type is type and e.event is event
    _.map filtered, (h)-> h.handler

  raiseEvent: (type, eventName, context, args, callback)->
    eventArgs = args

    handlers = @handlersFor(type, eventName)
    return callback null, args if handlers.length is 0
    
    calls =  _.map handlers,(handler)->
      (asyncCallback)->
        handler.apply context, [ eventArgs, (e, data)->
          eventArgs = data unless e?
          asyncCallback(e)
        ]

    async.series calls, (e)->
      callback e, eventArgs
module.exports = new EventManager