
var seeker = require('../index');

// create schema
var schema = seeker.Schema();
schema.addField("author", seeker.StandardAnalizer());
schema.addField("quite", seeker.StandardAnalizer());
schema.addField("color", seeker.KeywordAnalizer());

// create indices
var indexer = seeker.Indexer();
indexer.createIndex("test1", schema);
indexer.createIndex("test2", schema);

// add documents
indexer.addDocument("test1", {"author": "Aesop", "quite": "Any excuse will serve a tyrant.", "color": "red"});
indexer.addDocument("test1", {"author": "Aesop", "quite": "Appearances often are deceiving.", "color": "blue"});
indexer.addDocument("test1", {"author": "Aesop", "quite": "Put your shoulder to the wheel.", "color": "green"});
indexer.addDocument("test2", {"author": "Woody Allen", "quite": "Eighty percent of success is showing up.", "color": "yellow"});
indexer.addDocument("test2", {"author": "Woody Allen", "quite": "On the plus side, death is one of the few things that can be done just as easily lying down.", "color": "black"});


// search
var _query = function(indices, q) {
    console.log("---------------------");
    console.log("query:", q);
    console.log("indices:", indices ? indices.toString() : "all");
    console.log("result:", JSON.stringify(indexer.search(indices, seeker.Query(q))));
    console.log("---------------------");
};

_query(null, "(Aesop&(wheel | tyrant))");
_query("test1", "(woody & plus)");
_query("test2", "(red | yellow)");
_query(["test1", "test2"], "(red - serve)");
_query(null, "(red - often)");






