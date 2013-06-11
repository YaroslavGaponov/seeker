
var util = require("util");

var Analizer = module.exports = function(tokenizer) {
    this.tokenizer = tokenizer;
    this.filters = [];
}

Analizer.prototype.parse = function(text) {
    var tokens = [];
    var acc = '';
    for(var i=0; i<text.length; i++) {
        if (! this.tokenizer(text[i]) ) {
            if (!isEmpty(acc)) {
                tokens.push(acc);
                acc = '';
            }            
        } else acc += text[i];
    }
    
    if (!isEmpty(acc)) {
        tokens.push(acc);
    }    
    
    return this.filtring(tokens);
}

Analizer.prototype.filtring = function(terms, filterNo) {
    
    terms = util.isArray(terms) ? terms : [terms];
    filterNo = filterNo ? filterNo : 0;
    
    if (filterNo >= this.filters.length) return terms;
    
    var acc = [];
    for (var i=0; i<terms.length; i++) {
        if (!isEmpty(terms[i])) {
            var _acc = this.filtring(this.filters[filterNo](terms[i]), filterNo + 1);
            _acc = util.isArray(_acc) ? _acc : [_acc];
            for(var j=0; j<_acc.length; j++) {
                if (!isEmpty(_acc[j])) {
                    acc.push(_acc[j]);
                }
            }
        }
    }
    return acc;
}


Analizer.prototype.addFilter = function(filter) {
    this.filters.push(filter);
    return this;
}

Analizer.prototype.getType = function() {
    return this.constructor.toString().match(/function (\w*)/)[1];
}


var isEmpty = function(text) {
    var empty = [undefined, null, ""];
    for(var i=0; i<empty.length; i++) {
        if (text === empty[i]) {
            return true;
        }
    }
    return false;
}
