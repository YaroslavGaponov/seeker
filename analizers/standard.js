

var util = require("util");
var Analizer = require("./analizer");

var WhitespaceTokenizer = require("./tokenizers/whitespace");
var LowerCaseFilter = require("./filters/lowercase");


var StandardAnalizer = module.exports = function() {
    if (this instanceof StandardAnalizer) {
        Analizer.call(this, WhitespaceTokenizer, [LowerCaseFilter]);
    } else {
        return new StandardAnalizer();
    }
}

util.inherits(StandardAnalizer, Analizer);