var path  = require('path');
var Queue = require(path.resolve(__dirname, "queue.js"));
var Trie  = require(path.resolve(__dirname, "trie.js"));

var GRIDSIZE = 4;

var Cheat = module.exports = function Cheat() {
    this.trie = new Trie();
};

Cheat.prototype.process = function process(grid, cb) {
    this.trie.init(path.join(__dirname, "corncob_lowercase.txt"), function(error, trie) {
        if (error) {
            cb(error);
            return;
        }
        
        console.log("Implement core logic here.");
        cb(null, ["Hello", "World"]);
    });
};

if (!module.parent) {
    if (process.argv.length != 2 + GRIDSIZE) {
        console.log("Usage: node cheat.js d a r e");
        process.exit();
    }

    var cheat = new Cheat();
    var args = Array.prototype.slice.call(arguments);
    args.splice(0, 2);
    cheat.process(args, function(error, results) {
        if (error) {
            throw error;
        }
        
        console.log("Here are the generated words:");
        for (var i=0, len=results.length; i<len; i++) {
            console.log("\t" + results[i]);
        }
    });
}