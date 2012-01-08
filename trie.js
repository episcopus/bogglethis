var fs = require('fs');
var _ = require('underscore');
var path = require('path');

var Trie = module.exports = function Trie(dictionaryFile) {
    // this.root = new TrieNode();
    this.root = {};
    if (!dictionaryFile) {
        return;
    }

    fs.readFile(dictionaryFile, "utf8", function(error, data) {
        if (error) {
            throw error;
        }
        // console.log(data);
        var lines = data.split("\n");
        _(lines).each(function(line) {
        });
    });
}

Trie.prototype.add = function add(word) {
};

Trie.prototype.query = function query(word) {
};


var TrieNode = function TrieNode() {
    this.children = {};
};

TrieNode.prototype.addChild = function addChild(char) {
};

TrieNode.prototype.getChild = function getChild(char) {
};

if (!module.parent) {
    var trie = new Trie(path.join(__dirname, "corncob_lowercase.txt"));
}