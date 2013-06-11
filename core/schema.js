

var Schema = module.exports = function() {
    if (this instanceof Schema) {
        this.schema = {};
    } else {
        return new Schema();
    }
}

Schema.prototype.addField = function(name, analizer) {
    this.schema[name] = { analizer: analizer };
    return this;
}

Schema.prototype.getFields = function() {
    return Object.keys(this.schema);
}

Schema.prototype.getAnalizer = function(name) {
    return this.schema[name].analizer;
}