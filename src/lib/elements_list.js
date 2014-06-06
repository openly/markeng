// Generated by CoffeeScript 1.7.1
var ElementsList, FSManager, components, pages;

FSManager = require('./fs_manager');

pages = [];

components = [];

ElementsList = {
  get: function(type) {
    return FSManager.getDirContents("" + type);
  },
  addPage: function(page) {
    return pages.push(page);
  },
  addComp: function(comp) {
    return components.push(comp);
  },
  getPages: function() {
    return pages;
  },
  getComps: function() {
    return components;
  },
  reset: function() {
    pages = [];
    return components = [];
  }
};

module.exports = ElementsList;