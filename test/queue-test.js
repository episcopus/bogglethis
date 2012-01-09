var vows = require('vows');
var assert = require('assert');
var path = require('path');
var Queue = require(path.resolve(__dirname, '../queue.js'));

vows.describe('Queue Test').addBatch({
    'when intializing a blank Queue': {
        topic: function() {
            var queue = new Queue();
            return queue;
        },
        'we get a valid instance': function(topic) {
            assert.isNotNull(topic);
        }
    },
    'when adding an element to the queue': {
        topic: function() {
            var queue = new Queue();
            queue.enqueue(1);
            return queue;
        },
        'the queue reports its length correctly': function(queue) {
            var len = queue.length();
            assert.equal(len, 1);
        }
    },
    'when removing a single element from the queue': {
        topic: function() {
            var queue = new Queue();
            queue.enqueue(1);
            queue.dequeue();
            return queue;
        },
        'the queue reports its length correctly': function(queue) {
            var len = queue.length();
            assert.equal(len, 0);
        }
    },
    'when removing a single element from the queue': {
        topic: function() {
            var queue = new Queue();
            queue.enqueue(1);
            return queue.dequeue();
        },
        'we get the expected item': function(item) {
            assert.equal(1, item);
        }
    },
    'when adding several elements to the queue': {
        topic: function() {
            var queue = new Queue();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            return queue;
        },
        'the queue reports its length correctly': function(queue) {
            var len = queue.length();
            assert.equal(len, 3);
        }
    },
    'when adding several elements to the queue': {
        topic: function() {
            var queue = new Queue();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            return queue;
        },
        'the queue reports its length correctly': function(queue) {
            var len = queue.length();
            assert.equal(len, 3);
        },
        'then dequeueing one': {
            topic: function(queue) {
                var item = queue.dequeue();
                return [ queue, item ]
            },
            'we get the expected item': function(array) {
                assert.equal(1, array[1]);
            },
            'the queue reports its length correctly': function(array) {
                assert.equal(2, array[0].length());
            },
            'then dequeueing another one': {
                topic: function(array) {
                    var queue = array[0];
                    var item = queue.dequeue();
                    return [ queue, item ]
                },
                'we get the expected item': function(array) {
                    assert.equal(2, array[1]);
                },
                'the queue reports its length correctly': function(array) {
                    assert.equal(1, array[0].length());
                },
                'then dequeueing the final one': {
                    topic: function(array) {
                        var queue = array[0];
                        var item = queue.dequeue();
                        return [ queue, item ]
                    },
                    'we get the expected item': function(array) {
                        assert.equal(3, array[1]);
                    },
                    'the queue reports its length correctly': function(array) {
                        assert.equal(0, array[0].length());
                    },
                    'when attempting to dequeue one beyond': {
                        topic: function(array) {
                            var queue = array[0];
                            var item = queue.dequeue();
                            return [ queue, item ];
                        },
                        'we get the expected result': function(array) {
                            assert.isUndefined(array[1]);
                        },
                        'the queue reports its length correctly': function(array) {
                            assert.equal(0, array[0].length());
                        }
                    }
                }
            }
        }
    },
    'when adding then removing elements from the queue': {
        topic: function() {
            var queue = new Queue();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.dequeue();
            return queue;
        },
        'the queue reports its length correctly': function(queue) {
            var len = queue.length();
            assert.equal(len, 1);
        },
        'the final element is the expected one': function(queue) {
            var item = queue.dequeue();
            assert.equal(item, 2);
        }
    }    
}).export(module);