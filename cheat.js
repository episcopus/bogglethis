var path  = require('path');
var Queue = require(path.resolve(__dirname, "queue.js"));
var Trie  = require(path.resolve(__dirname, "trie.js"));

var GRIDSIZE = 2;

var Cheat = module.exports = function Cheat() {
    this.trie = new Trie();
};

var deltas = [
    { x : -1, y : -1 },
    { x : 0, y : -1 },
    { x : 1, y : -1 },
    { x : -1, y : 0 },
    { x : 1, y : 0 },
    { x : -1, y : 1 },
    { x : 0, y : 1 },
    { x : 1, y : 1 }
];

var values = {
    a : 1,
    b : 4,
    c : 4, 
    d : 2,
    e : 1,
    f : 4,
    g : 3,
    h : 3,
    i : 1,
    j : 10,
    k : 5,
    l : 2,
    m : 4,
    n : 2,
    o : 1,
    p : 4,
    q : 10,
    r : 1,
    s : 1,
    t : 1,
    u : 2,
    w : 4,
    x : 8,
    y : 3,
    z : 10
};

var copyObj = function copyObj(item) {
    var newOne = {
        x : item.x,
        y : item.y,
        node : item.node,
        grid : [],
        str : item.str,
        val : item.val
    };

    var newGrid = [];
    for (var y=0; y<GRIDSIZE; y++) {
        var row = [];
        for (var x=0; x<GRIDSIZE; x++) {
            row.push(item.grid[y][x]);
        }
        newGrid.push(row);
    }
    newOne.grid = newGrid;

    return newOne;
};

var initGrid = function initGrid(grid) {
    // Turn grid in multi-dimensional array for further processing.
    GRIDSIZE = Math.sqrt(grid.length);
    var newGrid = [];
    for (var y=0; y<GRIDSIZE; y++) {
        var row = [];
        for (var x=0; x<GRIDSIZE; x++) {
            row.push(grid[y * GRIDSIZE + x]);
        }
        newGrid.push(row);
    }
    // console.log("new grid:", newGrid);
    return newGrid;
}

var getInitPos = function getInitPos(trie) {
    // console.log("Implement core logic here.");
    var cur = { 
        x : 0,
        y : 0,
        node : trie.root,
        grid : undefined,
        str : "",
        val : 0
    };

    var blankGrid = [];
    for (var y=0; y<GRIDSIZE; y++) {
        var row = [];
        for (var x=0; x<GRIDSIZE; x++) {
            row.push(0);
        }
        blankGrid.push(row);
    }
    cur.grid = blankGrid;

    return cur;
}

var isSquare = function isSquare(num) {
    return Math.sqrt(num) - Math.floor(Math.sqrt(num)) == 0;
};

Cheat.prototype.process = function process(grid, cb) {
    this.trie.init(path.join(__dirname, "corncob_lowercase.txt"), function(error, trie) {
        if (error) {
            cb(error);
            return;
        }
        
        grid = initGrid(grid);
        var cur = getInitPos(trie);

        var q = new Queue();
        var words = [];

        // Initial starting states - one for each square in the grid.
        for (var xSize = 0; xSize<GRIDSIZE; xSize++) {
            for (var ySize = 0; ySize<GRIDSIZE; ySize++) {
                var newPos = copyObj(cur);
                newPos.x = xSize;
                newPos.y = ySize;
                newPos.str = grid[ySize][xSize];
                newPos.node = cur.node.getChild(newPos.str);
                newPos.grid[ySize][xSize] = 1;
                newPos.val = values[grid[ySize][xSize]];
                q.enqueue(newPos);
            }
        }

        // console.log("current queue length:", q.length());

        while (q.length() > 0) {
            cur = q.dequeue();
            // console.log("now looking at:", cur);
            if (cur.node.getChild('\0') && cur.str.length > 2) {
                words.push( { word : cur.str, val : cur.val } );
            }

            for (var i=0, len=deltas.length; i<len; i++) {
                // console.log("now processing delta:", deltas[i]);
                if (cur.x + deltas[i].x < 0)
                    continue;
                if (cur.x + deltas[i].x >= GRIDSIZE)
                    continue;
                if (cur.y + deltas[i].y < 0)
                    continue;
                if (cur.y + deltas[i].y >= GRIDSIZE)
                    continue;
                if (cur.grid[cur.y + deltas[i].y][cur.x + deltas[i].x] == 1)
                    continue;
                var nextLetter = grid[cur.y + deltas[i].y][cur.x + deltas[i].x];
                // console.log("validating next step is trie compliant:", nextLetter);
                if (!cur.node.getChild(nextLetter))
                    continue;
                
                // Enqueue new valid search state.
                var newOne = copyObj(cur);
                newOne.x = cur.x + deltas[i].x;
                newOne.y = cur.y + deltas[i].y;
                var letter = grid[newOne.y][newOne.x];
                newOne.str = newOne.str + letter;
                newOne.grid[newOne.y][newOne.x] = 1;
                newOne.node = newOne.node.getChild(letter);
                newOne.val = newOne.val + values[letter];
                q.enqueue(newOne);                
                // console.log("enqueuing this:", newOne);
            }
         }
        
        words = words.sort(function(a, b) {
            return b.val - a.val;
        });
        cb(null, words);
    });
};

if (!module.parent) {
    if (process.argv.length != 3 || !isSquare(process.argv[2].length)) {
        console.log("Usage: node cheat.js abcdefghi");
        console.log("The length of the puzzle string (abc.. in the above example) must be a perfect square.");
        process.exit();
    }

    var cheat = new Cheat();
    cheat.process(process.argv[2], function(error, results) {
        if (error) {
            throw error;
        }
        console.log("Here are the generated words (" + results.length + "):");
        for (var i=0, len=results.length; i<len; i++) {
            console.log("\t" + results[i].word + " (" + results[i].val + ")");
        }
    });
}