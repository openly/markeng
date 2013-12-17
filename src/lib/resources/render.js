var hogan = require('hogan.js');

var ResourceRender = function(){
    this.renderJS = function(scripts){
        var templateStr = "{{#scripts}}<script type=\"text/javascript\" src=\"{{.}}\"></script>\n{{/scripts}}"
        var template = hogan.compile(templateStr);
        return template.render({scripts: scripts});
    }

    this.renderCSS = function(styleSheets){
        var templateStr = "{{#styleSheets}}<link rel=\"stylesheet\" href=\"{{.}}\">\n{{/styleSheets}}"
        var template = hogan.compile(templateStr);
        return template.render({styleSheets: styleSheets});
    }
}

module.exports = new ResourceRender();