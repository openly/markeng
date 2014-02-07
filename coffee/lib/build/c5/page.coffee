MarkengPage = require('../../page')
_ = require('underscore')
config = require('../../../config')
FSManager = require('../../fs_manager')
StaticPageBuilder = require('../static/page')

C5PageBuilder =
  build: (assets, dir)->
    _.each MarkengPage.all(), (page)->
      new C5Page(page).build assets, dir

class C5Page extends StaticPageBuilder.PageBuilderClass
  getFileName: ()->
    return @markengPage.name + ".php"

module.exports = C5PageBuilder