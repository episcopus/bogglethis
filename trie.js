var fs = require('fs');
var _ = require('underscore');

var Trie = module.exports = function Trie(dictionaryFile) {
    // this.root = new TrieNode();
    this.root = {};
    
    fs.readFile(dictionaryFile, "utf8", function(error, data) {
        if (error) {
            throw error;
        }

        console.log(data);

        var lines = data.split("\n");
        _(lines).each(function(line) {
            // console.log(line);
            
        });
    });
}

Trie.prototype.Add = function Add(word) {
};

Trie.prototype.Query = function Query(word) {
};


var TrieNode = function TrieNode() {
    this.children = {};
};

TrieNode.prototype.AddChild = function AddChild(char) {
};

TrieNode.prototype.GetChild = function GetChild(char) {
};

if (!module.parent) {
    var trie = new Trie("/Users/sasselin/Projects/Coding Problems/SimpleProblemsCSharp/SimpleProblemsCSharp/Resources/corncob_lowercase.txt");
}