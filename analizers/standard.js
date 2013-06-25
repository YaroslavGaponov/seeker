
var util = require("util");
var Analizer = require("./libs/analizer");
var filters = require("./libs/filters");
var tokenizers = require("./libs/tokenizers");

var StandardAnalizer = module.exports = function() {
    
    if (this instanceof StandardAnalizer) {
    
        Analizer.call(this, tokenizers.standard);
        
        this.addFilter(filters.standard(3, 255));
        this.addFilter(filters.lowercase);
        this.addFilter(filters.stopWords);
    } else {
        return new StandardAnalizer();
    }
}

util.inherits(StandardAnalizer, Analizer);





