FSManager = require './fs_manager'

pages      = []
components = []

ElementsList =
  get: (type) ->
    FSManager.getDirContents("#{type}")

  addPage: (page) ->
    pages.push page

  addComp: (comp) ->
    components.push comp

  getPages: ()->
    pages

  getComps: ()->
    components

  reset: ()->
    pages = []
    components = []

module.exports = ElementsList