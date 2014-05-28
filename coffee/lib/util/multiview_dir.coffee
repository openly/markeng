ViewEnableMultiFolders = (app) ->
  
  # Monkey-patch express to accept multiple paths for looking up views.
  # this path may change depending on your setup.
  # console.log app
  # lookup_proxy = app.get("view")::lookup
  # app.get("view")::lookup = (viewName) ->
  #   context = undefined
  #   match = undefined
  #   if @root instanceof Array
  #     i = 0

  #     while i < @root.length
  #       context = root: @root[i]
  #       match = lookup_proxy.call(context, viewName)
  #       return match  if match
  #       i++
  #     return null
  #   lookup_proxy.call this, viewName

module.exports = ViewEnableMultiFolders