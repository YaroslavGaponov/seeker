

var Query = module.exports = function(query) {
    
    if (this instanceof Query) {
        this.tokens = [];
        
        var acc = '';
        for(var i=0; i<query.length; i++) {
            if (isLetter(query[i])) {
                acc += query[i];
            } else if (isOperation(query[i])) {
                if (acc != '') { this.tokens.push({type: TokenType.Word, value: acc}); acc = ''; }
                this.tokens.push({type: TokenType.Operator, value: query[i]});        
            } else if (isEndBracket(query[i])) {
                if (acc != '') { this.tokens.push({type: TokenType.Word, value: acc}); acc = ''; }
                this.tokens.push({type: TokenType.EndBracket, value: query[i]});
            } else {
                if (acc != '') { this.tokens.push({type: TokenType.Word, value: acc}); acc = ''; }
            }        
        }
        if (acc != '') { this.tokens.push({type: TokenType.Word, value: acc}); acc = ''; }
    } else {
        return new Query(query);
    }
}

Query.prototype.exec = function(getDocsSet) {
    
    var stackSets = [];
    var stackOps = [];
    for (var i=0; i<this.tokens.length; i++) {
        switch (this.tokens[i].type) {
            case TokenType.Word:
                stackSets.push(getDocsSet(this.tokens[i].value));
                break;
            case TokenType.Operator:
                stackOps.push(this.tokens[i].value);
                break;
            case TokenType.EndBracket:
                if (stackSets.length < 2 || stackOps.length < 1) {
                    throw new Error("syntax error.");
                }
                var set1 = stackSets.pop();
                var set2 = stackSets.pop();
                var op = stackOps.pop();
                switch(op) {
                    case "|": 
                        stackSets.push(set2.OR(set1));
                        break;
                    case "&": case "+":
                        stackSets.push(set2.AND(set1));
                        break;
                    case "-": case "!":
                        stackSets.push(set2.NOT(set1));
                        break;
                }
                break;
                
        }
    }
    
    if (stackSets.length !== 1) {
        throw new Error("syntax error.");
    }
    
    return stackSets.pop();
}


var TokenType = {
    "Word": 1,
    "Operator": 2,
    "EndBracket": 3
}

var isLetter = function(ch) {
    return (ch >='a' && ch <= 'z') || (ch >='A' && ch <= 'Z') || ("'".indexOf(ch) !== -1);
}

var isOperation = function(ch) {
    return "|&-+!".indexOf(ch) !== -1;
}

var isEndBracket = function(ch) {
    return ")".indexOf(ch) !== -1;    
}