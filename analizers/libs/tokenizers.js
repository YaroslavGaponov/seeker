

module.exports.standard = function(ch) {
    return (ch >='a' && ch <= 'z') || (ch >='A' && ch <= 'Z') || ("'".indexOf(ch) !== -1);
}

module.exports.keyword = function(ch) {
    return true;
}
