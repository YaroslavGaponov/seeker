
module.exports.standard = function(min, max) {
    return function(token) {
        return token.length >= min  && token.length <= max ? token : null;
    }
}

module.exports.lowercase = function(token) {
    return token.toLowerCase();
}

module.exports.soundex = function(token) {
    var tok = token.toLowerCase();
    var acc = tok[0] + "000";
    var j = 0;
    for(var i=1; i<tok.length; i++) {
        switch(tok[i]) {
            case 'b': case 'f': case 'p': case 'v':
                if (acc[j] != '1') acc[++j] = '1'; break;
            case 'c': case 'g': case 'j': case 'k': case 'q': case 's': case 'x': case 'z':
                if (acc[j] != '2') acc[++j] = '2'; break;
            case 'd': case 't':
                if (acc[j] != '3') acc[++j] = '3'; break;
            case 'l':
                if (acc[j] != '4') acc[++j] = '4'; break;                
            case 'm': case 'n':
                if (acc[j] != '5') acc[++j] = '5'; break;
            case 'r':
                if (acc[j] != '6') acc[++j] = '6'; break;                                
        }        
        if (j >= 4) break;
    }
    return acc;
}

module.exports.stopWords = function(token) {
    var stopWordsList = [
        "a",
        "about",
        "above",
        "after",
        "again",
        "against",
        "all",
        "am",
        "an",
        "and",
        "any",
        "are",
        "aren't",
        "as",
        "at",
        "be",
        "because",
        "been",
        "before",
        "being",
        "below",
        "between",
        "both",
        "but",
        "by",
        "can't",
        "cannot",
        "could",
        "couldn't",
        "did",
        "didn't",
        "do",
        "does",
        "doesn't",
        "doing",
        "don't",
        "down",
        "during",
        "each",
        "few",
        "for",
        "from",
        "further",
        "had",
        "hadn't",
        "has",
        "hasn't",
        "have",
        "haven't",
        "having",
        "he",
        "he'd",
        "he'll",
        "he's",
        "her",
        "here",
        "here's",
        "hers",
        "herself",
        "him",
        "himself",
        "his",
        "how",
        "how's",
        "i",
        "i'd",
        "i'll",
        "i'm",
        "i've",
        "if",
        "in",
        "into",
        "is",
        "isn't",
        "it",
        "it's",
        "its",
        "itself",
        "let's",
        "me",
        "more",
        "most",
        "mustn't",
        "my",
        "myself",
        "no",
        "nor",
        "not",
        "of",
        "off",
        "on",
        "once",
        "only",
        "or",
        "other",
        "ought",
        "our",
        "ours",
        "ourselves",
        "out",
        "over",
        "own",
        "same",
        "shan't",
        "she",
        "she'd",
        "she'll",
        "she's",
        "should",
        "shouldn't",
        "so",
        "some",
        "such",
        "than",
        "that",
        "that's",
        "the",
        "their",
        "theirs",
        "them",
        "themselves",
        "then",
        "there",
        "there's",
        "these",
        "they",
        "they'd",
        "they'll",
        "they're",
        "they've",
        "this",
        "those",
        "through",
        "to",
        "too",
        "under",
        "until",
        "up",
        "very",
        "was",
        "wasn't",
        "we",
        "we'd",
        "we'll",
        "we're",
        "we've",
        "were",
        "weren't",
        "what",
        "what's",
        "when",
        "when's",
        "where",
        "where's",
        "which",
        "while",
        "who",
        "who's",
        "whom",
        "why",
        "why's",
        "with",
        "won't",
        "would",
        "wouldn't",
        "you",
        "you'd",
        "you'll",
        "you're",
        "you've",
        "your",
        "yours",
        "yourself",
        "yourselves"
    ];
        
    if (stopWordsList.indexOf(token.toLowerCase()) === -1) {
        return token;
    }
        
    return null;
}


