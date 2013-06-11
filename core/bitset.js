

var BitSet = module.exports = function() {
    this.data = {};
}

BitSet.prototype.clear = function() {
    this.data = {};
}

BitSet.prototype.insert = function(val) {

    if (typeof val !== "number") {
        throw new Error("Illegal argument exception.");    
    }
    
    var indx = val >>> 5;
    if (!this.data[indx]) {
        this.data[indx] = 0x00;
    }
    this.data[indx] |= 1 << (val & 0x1f);
}


BitSet.prototype.remove = function(val) {
    
    if (typeof val !== "number") {
        throw new Error("Illegal argument exception.");    
    }
    
    var indx = val >>> 5;
    if (this.data[indx]) {
        this.data[indx] &= ! ( 1 << ( val & 0x1f ) );        
    }    
}

BitSet.prototype.list = function() {
    var values = [];
    for(var indx in this.data) {
        for(var i=0; i<32; i++) {
            if ( ( ( this.data[indx] >> i ) & 0x01 ) === 0x01 ) {
                values.push( indx << 5 | i );
            }
        }
    }
    return values;
}


BitSet.prototype.AND = function(bitSet) {
    
    if (!(bitSet instanceof BitSet)) {
        throw new Error("Illegal argument exception.");    
    }
    
    for(var indx in this.data) {
        if (bitSet.data[indx]) {
            this.data[indx] &= bitSet.data[indx];            
            if (this.data[indx] === 0) {
                delete this.data[indx];
            }
        }
    }
    return this;
}

BitSet.prototype.OR = function(bitSet) {
    
    if (!(bitSet instanceof BitSet)) {
        throw new Error("Illegal argument exception.");    
    }
    
    for(var indx in this.data) {
        if (bitSet.data[indx]) {
            this.data[indx] |= bitSet.data[indx];
        }        
    }    
    for(var indx in bitSet.data) {
        if (!this.data[indx]) {
            this.data[indx] = bitSet.data[indx];
        }        
    }    
    return this;    
}

BitSet.prototype.NOT = function(bitSet) {
    for(var indx in bitSet.data) {
        if (this.data[indx]) {
            this.data[indx] &= ~bitSet.data[indx];
        }
    }
    return this;
}

BitSet.prototype.clone = function() {
    var bs = new BitSet();
    for(var indx in this.data) {
        bs.data[indx] = this.data[indx];
    }
    return bs;
}

