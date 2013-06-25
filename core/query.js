
var TokenTypes = {
    "WORD"      : "WORD",
    "OPERATOR"  : "OPERATOR",
    "START"     : "START",
    "STOP"      : "STOP"
}

var Operators = {
    "OR"        : "OR",
    "AND"       : "AND",
    "NOT"       : "NOT",
    getCode: function(op) {
        switch (op) {
            case "|": return this.OR;
            case "&": return this.AND;
            case "-": return this.NOT;
        }
        return this.AND;
    }
}


/*
 *@description tokenizer
*/
var _tokenizer = function(classifiers, s) {
    
    var list = [], type = null, acc = '';
    
    for(var i=0; i<s.length; i++) {
        if (type) {
            if (classifiers[type](s[i])) {
                acc += s[i];
            } else {
                list.push({type: type, value: acc});
                type = null; acc = '';
            }
        }
        if (!type){
            for(var classifier in classifiers) {
                if (classifiers[classifier](s[i])) {
                    type = classifier; acc = s[i]; break;
                }
            }
        }
    }
    
    if (type && acc != '') {
        list.push({type: type, value: acc});
    }
    
    return list;
}



/**
 *@description build expression tree
 */
var _buildExprTree = function(expr) {
    
    // read left
    var left = expr.shift();    
    if (left.type === TokenTypes.START) {
        left = _buildExprTree(expr);
    }

    // read operation
    var op = expr.shift();
    
    if (!op || (op.type === TokenTypes.STOP)) {
        return left;
    }
        
    // read right
    var right = expr.shift();
    if (right.type === TokenTypes.START) {
        right = _buildExprTree(expr);
    }
    
    // return tree
    return {
        left:   left.value ? left.value : left,
        op:     Operators.getCode(op.value),
        right:  right.value ? right.value : right
    };    
}

/*
 * @description calculate search expression
 */
var _calculate = function(getDocsSet) {
    return function(tree) {
        var self = arguments.callee;        
        if (typeof tree === "string") return getDocsSet(tree); 
        return self(tree.left)[tree.op](self(tree.right));
    }
}


/*
 *@description query
 */
var Query = module.exports = function(searchQuery) {
    
    if (this instanceof Query) {        
        // create classifiers    
        var classifiers = {};
        classifiers[TokenTypes.WORD] = function(ch) { return (ch >= 'a' && ch <='z') || (ch >= 'A' && ch <='Z') };
        classifiers[TokenTypes.OPERATOR] = function(ch) { return "&|-".indexOf(ch) != -1 };
        classifiers[TokenTypes.START] = function(ch) { return ch === '(' };
        classifiers[TokenTypes.STOP] = function(ch) { return ch === ')' };
            
        // tokenization and create expression tree
        this.tree = _buildExprTree(_tokenizer(classifiers, searchQuery));
    } else {
        return new Query(searchQuery);
    }
}


Query.prototype.run = function(getDocsSet) {
    return _calculate(getDocsSet)(this.tree);    
}