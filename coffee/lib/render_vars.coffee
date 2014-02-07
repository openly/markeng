_ = require('underscore')
FSManager = require('./fs_manager')

RenderVars = {
  get: (page, component, build)->
    retval = {};
    if(component)
      _.extend retval, getJson('/comps/' + component + '/data.json')
    if(page)
      _.extend retval, getJson('/pages/' + page + '/data.json')
    if(build)
      if(component)
        _.extend retval, getJson('/comps/' + component + '/data-build.json')
        _.extend retval, getJson('/comps/' + component + '/data-build-' + build + '.json')
        
      if(page)
        _.extend retval, getJson('/pages/' + page + '/data-build.json')
        _.extend retval, getJson('/pages/' + page + '/data-build-' + build + '.json')

      buildVars = type: build
      buildVars[build] = true;
      _.extend retval, {build: buildVars}

    retval;
}

getJson = (file)->
  return JSON.parse(FSManager.readFile(file)) if FSManager.exists(file);
  {}


module.exports = RenderVars