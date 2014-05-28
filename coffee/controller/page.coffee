config       = require '../config'
ElementsList = require '../lib/elements_list'
Element      = require '../lib/element'
async        = require 'async'

PageController = {
  showPage:(req, res, next)->
    pageEl = new Element(req.params.name, 'page')
    ElementsList.addPage pageEl
    async.mapSeries ['title', 'render', 'css', 'js'],
      (fn, asyncCb)-> pageEl[fn](asyncCb), 
      (e, renderArgs)->
        renderObj = {}
        [ renderObj.title, renderObj.main, renderObj.css, renderObj.js ] = renderArgs
        res.render 'page', renderObj
        ElementsList.reset()

  list: (req, res, next)->
    res.render('pagelist',pages: ElementsList.get('pages'))
}

module.exports = PageController;