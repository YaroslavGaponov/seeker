

module.exports = function(tokens) {
    var terms = [];
    for(var i=0; i<tokens.length; i++) {
        terms.push(tokens[i].toLowerCase());
    }
    return terms;
}