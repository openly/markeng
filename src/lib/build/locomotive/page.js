// Generated by CoffeeScript 1.6.3
var C5PageBuilder, FSManager, LocomotivePage, MarkengPage, StaticPageBuilder, config, _, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MarkengPage = require('../../page');

_ = require('underscore');

config = require('../../../config');

FSManager = require('../../fs_manager');

StaticPageBuilder = require('../static/page');

C5PageBuilder = {
  build: function(assets, dir) {
    return _.each(MarkengPage.all(), function(page) {
      return new LocomotivePage(page).build(assets, dir);
    });
  }
};

LocomotivePage = (function(_super) {
  __extends(LocomotivePage, _super);

  function LocomotivePage() {
    _ref = LocomotivePage.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LocomotivePage.prototype.getFileName = function() {
    var pageFile;
    pageFile = this.markengPage.name + '.liquid';
    if (config.home_page === this.markengPage.name) {
      pageFile = 'index.liquid';
    }
    return pageFile;
  };

  LocomotivePage.prototype.renderCSS = function(assets) {
    var retval;
    retval = _.map(assets.css, function(asset) {
      var tag;
      tag = '{{ \'' + asset.replace(/\.css$/, '') + '\' | stylesheet_tag }}';
      if (/^https?:\/\//.test(asset) || /^\/\//.test(asset)) {
        tag = '<link rel="stylesheet" href="' + asset + '">';
      }
      return tag;
    });
    return retval.join("\n");
  };

  LocomotivePage.prototype.renderJS = function(assets) {
    var retval;
    retval = _.map(assets.js, function(asset) {
      var tag;
      tag = '{{ \'' + asset.replace(/\.js$/, '') + '\' | javascript_tag }}';
      if (/^https?:\/\//.test(asset) || /^\/\//.test(asset)) {
        tag = '<script type="text/javascript" src="' + asset + '"></script>';
      }
      return tag;
    });
    return retval.join("\n");
  };

  return LocomotivePage;

})(StaticPageBuilder.PageBuilderClass);

module.exports = C5PageBuilder;
