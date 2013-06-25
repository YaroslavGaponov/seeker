

var util = require("util");
var Analizer = require("./analizer");

var KeywordTokenizer = require("./tokenizers/keyword");

var KeywordAnalizer = module.exports = function() {
    if (this instanceof KeywordAnalizer) {
        Analizer.call(this, KeywordTokenizer, [])
    } else {
        return new KeywordAnalizer();
    }
}

util.inherits(KeywordAnalizer, Analizer);