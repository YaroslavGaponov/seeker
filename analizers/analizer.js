
var util = require("util");

var Analizer = module.exports = function(tokenizer, filters) {
    if (this instanceof Analizer) {
        if (! tokenizer) {
            throw new Error("Tokenizer is required.")
        }
        this.tokenizer = tokenizer;
        if (filters)
            if (util.isArray(filters)) this.filters = filters;
                else this.filters = [filters];
    } else {
        return new Analizer(tokenizer, filters);
    }
}

Analizer.prototype.getTerms = function(text) {
    var acc = this.tokenizer(text);
    if (this.filters) {
        for(var i=0; i<this.filters.length; i++) {
            acc = this.filters[i](acc);
        }
    }
    return acc;
}