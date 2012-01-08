var vows = require('vows');
var assert = require('assert');
var path = require('path');
var Trie = require(path.resolve(__dirname, '../trie.js'));

vows.describe('Trie Test').addBatch({
    'when intializing a blank Trie': {
        topic: function() {
            var trie = new Trie();
            return trie;
        },
        'we get a valid instance': function(topic) {
            assert.isNotNull(topic);
        },
        'when adding a word to the Trie': {
            topic: function(trie) {
                trie.add("hello");
                return trie;
            },
            'we can query the word back': function(topic) {
                var result = topic.query("hello");
                assert.isNotNull(result);
            },
            'we don\'t find words that aren\'t there': function(topic) {
                var result = topic.query("hey");
                assert.isNull(result);
            },
            'we don\'t find subset words': function(topic) {
                var result = topic.query("he");
                assert.isNull(result);
            },
            'we don\'t find superset words': function(topic) {
                var result = topic.query("hellos");
                assert.isNull(result);
            }
        }
    },
    'when intializing a full Trie': {
        topic: function() {
            var trie = new Trie(path.resolve(__dirname, "../corncob_lowercase.txt"));
            return trie;
        },
        'we get a valid instance': function(topic) {
            assert.isNotNull(topic);
        }
    }
}).export(module);