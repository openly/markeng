var FSManager = require('./fs_manager')

var CustomHead = {
    get: function(){
        if(FSManager.exists('head.html')){
            return FSManager.readFile('head.html').toString();
        }
        return "";
    }
}

module.exports = CustomHead;