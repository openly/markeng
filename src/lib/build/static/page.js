var MarkengPage = require('../../page')
  , _ = require('underscore')
  , config = require('../../../config')
  , hogan = require('hogan.js')
  , fs = require('fs')
  , StaticComponent = require('./component')
  , Assets = require('../../assets')
  , FSManager = require('../../fs_manager')
  , customHead = require('../../custom_head')
;
var PageBuilder = {};
PageBuilder.build = function(assets, dir){
  _.each(MarkengPage.all(), function(page){
    new StaticPage(page).build(assets, dir);
  });
}

function StaticPage(markengPage){
  this.build = function(assets, dir){
    var fileName = ((config.home_page == markengPage.name) ? 'index.html': (markengPage.name + '.html'));
    var pageTemplate = hogan.compile(markengPage.getTemplate());
    var fullTemplate = hogan.compile(fs.readFileSync(__dirname + '/../../../../views/page.html').toString());

    var pageContents = pageTemplate.render(
      _.extend(
        {root_dir: '/',page_dir:'/'},
        StaticComponent.allAsFunction()
      )
    );

    var fullContents = fullTemplate.render({
      title:  config.title + " :: " + markengPage.name,
      stylesheets: Assets.renderCSS(assets.css, true),
      scripts: Assets.renderJS(assets.js, true),
      custom_head: customHead.get(),
      main: pageContents
    });

    FSManager.writeFile(dir + '/' + fileName, fullContents);
  }
}

module.exports = PageBuilder;