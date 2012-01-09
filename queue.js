var Queue = module.exports = function Queue() {
    this.queue = [];
}

Queue.prototype.enqueue = function enqueue(element) {
    this.queue.push(element);
};

Queue.prototype.dequeue = function dequeue() {
    if (this.queue.length < 1) {
        return undefined;
    }

    var item = this.queue.splice(0, 1)[0];
    return item;
};

Queue.prototype.length = function length() {
    return this.queue.length;
};