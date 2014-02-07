MarkengPage = require('../../page')
_ = require('underscore')
config = require('../../../config')
FSManager = require('../../fs_manager')
StaticPageBuilder = require('../static/page')

C5PageBuilder =
  build: (assets, dir)->
    _.each MarkengPage.all(), (page)->
      new LocomotivePage(page).build assets, dir

class LocomotivePage extends StaticPageBuilder.PageBuilderClass
  getFileName: ()->
    pageFile = @markengPage.name + '.liquid'
    pageFile = 'index.liquid' if (config.home_page == @markengPage.name);

    pageFile

  renderCSS: (assets)->
    retval = _.map assets.css,(asset)-> 
      tag = '{{ \'' + asset.replace(/\.css$/,'') + '\' | stylesheet_tag }}'
      if /^https?:\/\//.test(asset) or /^\/\//.test(asset)
        tag = '<link rel="stylesheet" href="' + asset + '">';
      tag
    retval.join("\n");


  renderJS: (assets)->
    retval = _.map assets.js,(asset)-> 
      tag = '{{ \'' + asset.replace(/\.js$/,'') + '\' | javascript_tag }}'
      if /^https?:\/\//.test(asset) or /^\/\//.test(asset)
        tag = '<script type="text/javascript" src="' + asset + '"></script>'
      tag
    retval.join("\n");

module.exports = C5PageBuilder