var config = require('../../config');

function Builder() {
  this.build= function(){
    var BuildTool;
    
    if(moduleExists('markeng-build-' + config.build_tool)){
      BuildTool = require('markeng-build-' + config.build_tool);
    }else if(moduleExists('./' + config.build_tool)){
      BuildTool = require('./' + config.build_tool);
    }else{
      console.log('Cannot find build module for "' + config.build_tool + '"');
      process.exit();
    }
    var theBuildTool = new BuildTool;

    theBuildTool.build(config.build_dir);
  }

  function moduleExists(name){
    try{
      require.resolve(name);
      return true;
    }catch(e){
      return false;
    }
  }
}

module.exports = new Builder();