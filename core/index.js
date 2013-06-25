
var BitSet = require('./bitset');

var Index = module.exports = function(schema) {
    if (this instanceof Index) {
        this.schema = schema;
        this.documents = {};
        this.reversedIndex = {};
        this.lastId = -1;
    } else {
        return new Index(schema);
    }
}

/*
 * add/remove/get document
 */
Index.prototype.addDocument = function(document) {
    var self = this;
    
    var id = ++this.lastId;
    this.documents[id] = document;
    
    for(var field in document) {
        var analizer = this.schema.getAnalizer(field);
        if (analizer) {
            var terms = analizer.getTerms(document[field]);
            terms.forEach(function(term) {
                if (!self.reversedIndex[field]) self.reversedIndex[field] = {};    
                if (!self.reversedIndex[field][term]) self.reversedIndex[field][term] = new BitSet();    
                self.reversedIndex[field][term].insert(id);
            });
        }
    }
        
    return id;
}

Index.prototype.removeDocument = function(id) {
    if (this.documents[id]) {
        delete this.documents[id];
        for (var field in this.reversedIndex) {
            for(var term in this.reversedIndex[field]) {
                if (this.reversedIndex[field][term]) {
                    this.reversedIndex[field][term].remove(id);
                }
            }
        }
    }
}

Index.prototype.getDocument = function(id) {
    return this.documents[id];
}


/*
 * get/set schema
 */
Index.prototype.getSchema = function() {
    return this.schema;
}

Index.prototype.setSchema = function(schema) {
    this.schema = schema;
}

/*
 * getDocsSet return documents for some token
 */
Index.prototype.getDocsSet = function(token) {    
    var fields = this.schema.getFields();
    var acc = new BitSet();
    for(var i=0; i<fields.length; i++) {
        var analizer = this.schema.getAnalizer(fields[i]);
        if (analizer) {
            var terms = analizer.getTerms(token);        
            var _acc;
            for(var j=0; j<terms.length; j++) {
                if (this.reversedIndex[fields[i]][terms[j]]) {
                    if (_acc) { _acc.AND(this.reversedIndex[fields[i]][terms[j]]) }
                        else  { _acc = this.reversedIndex[fields[i]][terms[j]].clone(); }
                }
                
            }
            if (_acc) { acc = acc.OR(_acc); }
        }
    }
    return acc;
}


