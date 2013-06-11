
var util = require('util');
var Index = require('./index');
var BitSet = require('./bitset');

var Indexer = module.exports = function() {
    if (this instanceof Indexer) {
        this.indices = {};
    } else {
        return new Indexer();
    }
}


/*
 * create/remove/get indices
 */
Indexer.prototype.createIndex = function(name, schema) {
    if (this.indices[name]) {
        throw new Error("Index already exists.");
    }
    this.indices[name] = new Index(schema);
}

Indexer.prototype.removeIndex = function(name) {
    if (this.indices[name]) {
        delete this.indices[name];
    }
}
Indexer.prototype.getIndices = function() {
    return Object.keys(this.indices);
}

/*
 * add/remove document
 */
Indexer.prototype.addDocument = function(index, document) {
    if (!this.indices[index]) {
        throw new Error("Index is not found.");    
    }
    return this.indices[index].addDocument(document);    
}

Indexer.prototype.removeDocument = function(index, id) {
    if (!this.indices[index]) {
        throw new Error("Index is not found.");    
    }    
    this.indices[index].removeDocument(index, id);    
}

/*
 * search
 */
Indexer.prototype.search = function(indices, query) {
    var self = this;
    
    if(!indices) indices = Object.keys(this.indices);
    if (!util.isArray(indices)) indices = [indices];
        
    var start = Date.now();
    
    var hits = [];
    for(var i=0; i<indices.length; i++) {
        var set = query.exec
            (
                function(term) {
                    return self.indices[indices[i]].getDocsSet(term);
                }
            );
        
        set.list().forEach(function(id) {
            hits.push({ _index: indices[i], _id: id, _source: self.indices[indices[i]].getDocument(id) });    
        });        
        
    }
        
    return { took: (Date.now() - start), total: hits.length, hits: hits };
}


