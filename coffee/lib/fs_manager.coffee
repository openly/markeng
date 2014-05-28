config = require "../config"
fs     = require "fs"
fse    = require "fs.extra"
path   = require "path"
_      = require "underscore"

FSManager =
  getDirContents: (dir, includes, excludes) ->
    dirPath = path.normalize(config.dir + "/" + dir)
    return []  unless fs.existsSync(dirPath)
    contents = fs.readdirSync(dirPath)
    contents = include(contents, includes)  if typeof includes isnt "undefined" and includes?
    contents = exclude(contents, excludes)  if typeof excludes isnt "undefined" and excludes?
    contents

  getDirContentsRecursive: (dir, includes, excludes) ->
    contents = FSManager.getDirContents(dir, includes, excludes)
    subDirs = _.map(contents, (content) ->
      if fs.statSync(path.normalize(config.dir + "/" + dir + "/" + content)).isDirectory()
        FSManager.getDirContentsRecursive dir + "/" + content
      else
        `undefined`
    )
    _.object contents, subDirs

  createRecursiveDirs: (basePath, dirPath) ->
    splitDirs = dirPath.split(/\//)
    nextDir = path.normalize(basePath + "/" + splitDirs.shift())
    fs.mkdirSync nextDir  unless fs.existsSync(nextDir)
    FSManager.createRecursiveDirs nextDir, splitDirs.join("/")  if splitDirs.length >= 1

  exists: (file) ->
    fs.existsSync path.normalize(config.dir + "/" + file)

  readFile: (file) ->
    fs.readFileSync(path.normalize(config.dir + "/" + file)).toString()

  writeFile: (file, contents) ->
    fs.writeFileSync path.normalize(file), contents

  append: (file, contents) ->
    fs.appendFileSync path.normalize(file), contents

  rmrf: (dir) ->
    fse.rmrfSync dir

  cp: (src, dest) ->
    fs.createReadStream(path.normalize(config.dir + "/" + src)).pipe fs.createWriteStream(path.normalize(dest))

  cpr: (src, dest) ->
    fse.copyRecursive path.normalize(config.dir + "/" + src), path.normalize(dest), ->


include = (contents, includes) ->
  filtered = []
  if _.isArray(includes)
    _.each includes, (includeRule) ->
      filtered = _.union(filtered, include(contents, includeRule))

  else
    if includes instanceof RegExp
      filtered = _.filter(contents, (content) ->
        includes.test content
      )
    else
      filtered = _.filter(contents, (content) ->
        includes is content
      )
  filtered
exclude = (contents, excludes) ->
  toExclude = include(contents, excludes)
  _.difference contents, toExclude

  

module.exports = FSManager