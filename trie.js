var fs = require('fs');
var _ = require('underscore');
var path = require('path');

var Trie = module.exports = function Trie() {
    this.root = new TrieNode();
}

Trie.prototype.init = function init(dictionaryFile, cb) {
    var self = this;
    // console.log("initing new Trie for:", dictionaryFile);

    fs.readFile(dictionaryFile, "utf8", function(error, data) {
        // console.dir(arguments);
        if (error) {
            cb(error, null);
            return;
        }

        // console.log(data);
        var lines = data.split("\n");
        _(lines).each(function(line) {
            line = line.trim();
            // console.log("now adding", line);
            self.add(line);
        });
        
        cb(null, self);
    });
}

Trie.prototype.add = function add(word) {
    var cur = this.root;
    for (var i=0, len=word.length; i<len; i++) {
        var child = cur.getChild(word[i]);
        if (!child) {
            child = cur.addChild(word[i]);
        }
        cur = child;
    }

    cur.addChild('\0');
};

Trie.prototype.query = function query(word) {
    var cur = this.root;
    var ret = null;
    for (var i=0, len=word.length; i<len; i++) {
        // console.log("Looking for", word[i], "at", cur);
        cur = cur.getChild(word[i]);
        if (!cur) {
            break;
        }
    }

    ret = cur == null ? null : 
        cur.getChild('\0') == null ? null : cur;

    return ret;
};


var TrieNode = function TrieNode() {
    this.children = {};
};

TrieNode.prototype.addChild = function addChild(char) {
    var tn = new TrieNode();
    this.children[char] = tn;
    return tn;
};

TrieNode.prototype.getChild = function getChild(char) {
    var ret = this.children[char] || null;
    return ret;
};

if (!module.parent) {
    var trie = new Trie(path.join(__dirname, "corncob_lowercase.txt"));
}