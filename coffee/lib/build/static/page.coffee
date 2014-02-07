MarkengPage = require('../../page')
_ = require('underscore')
config = require('../../../config')
hogan = require('hogan.js')
fs = require('fs')
StaticComponent = require('./component')
Assets = require('../../assets')
FSManager = require('../../fs_manager')
customHead = require('../../custom_head')
MarkengRenderVars = require('../../render_vars')

PageBuilder =
  build: (assets, dir)->
    _.each MarkengPage.all(), (page)->
      new StaticPage(page).build assets, dir

class StaticPage
  constructor: (markengPage)->
    @markengPage = markengPage
    
  build: (assets, dir)->
    fileName = @getFileName()
    pageTemplate = hogan.compile(@markengPage.getTemplate());
    fullTemplate = hogan.compile(@getTemplate());

    pageContents = pageTemplate.render @getRenderVars();

    fullContents = fullTemplate.render(
      title:  config.title + " :: " + @markengPage.name,
      stylesheets: @renderCSS(assets),
      scripts: @renderJS(assets),
      custom_head: customHead.get(),
      main: pageContents
    );

    FSManager.writeFile(dir + '/' + fileName, fullContents);

  getFileName: ()->
    pageFile = @markengPage.name + '.html'
    pageFile = 'index.html' if (config.home_page == @markengPage.name);
    
    pageFile

  renderCSS: (assets)->
    Assets.renderCSS(assets.css, true)

  renderJS: (assets) ->
    Assets.renderJS(assets.js, true)

  getRenderVars: ()->
    _.extend(
      {root_dir: '/',page_dir:'/'},
      StaticComponent.allAsFunction(@markengPage.name),
      MarkengRenderVars.get(@markengPage.name, null, config.build_tool)
    )

  getTemplate: ()->
    fs.readFileSync(__dirname + '/../../../../views/page.html').toString()
    
module.exports = PageBuilder;
module.exports.PageBuilderClass = StaticPage;