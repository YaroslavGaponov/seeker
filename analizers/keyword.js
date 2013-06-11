
var util = require("util");
var Analizer = require("./libs/analizer");
var filters = require("./libs/filters");
var tokenizers = require("./libs/tokenizers");

var KeywordAnalizer = module.exports = function() {
    
    if (this instanceof KeywordAnalizer) {
        Analizer.call(this, tokenizers.keyword);
        
        this.addFilter(filters.lowercase);
    } else {
        return new KeywordAnalizer();
    }
}

util.inherits(KeywordAnalizer, Analizer);





