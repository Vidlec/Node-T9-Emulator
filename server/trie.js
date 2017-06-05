var fs = require("fs");
const keys = {
        'a': 2,
        'b': 2,
        'c': 2,
        'd': 3,
        'e': 3,
        'f': 3,
        'g': 4,
        'h': 4,
        'i': 4,
        'j': 5,
        'k': 5,
        'l': 5,
        'm': 6,
        'n': 6,
        'o': 6,
        'p': 7,
        'q': 7,
        'r': 7,
        's': 7,
        't': 8,
        'u': 8,
        'v': 8,
        'w': 9,
        'x': 9,
        'y': 9,
        'z': 9
    };
    


//This solution is far better. It uses prefix trees.
//It generates all possible numeric combinations for given dictionary words.
//Then its easy to traverse tree for given number and list all asociated words.
//Credit goes to http://www.mitchrobb.com/t9-in-javascript-with-a-prefix-tree/

var Trie = function () {
    this.children = {};
    this.words = [];
};

Trie.prototype.insert = function (word) {
    var nodeToAddWord = traverseAddingNodes(this);
    nodeToAddWord.words.push(word);

    function traverseAddingNodes(node) {
        var i = 0,
            len = word.length;
        for (i, len; i < len; i++) {
            var thisLetter = word[i];
            var thisKey = keys[thisLetter];

            if (node.children.hasOwnProperty(thisKey)) {
                node = node.children[thisKey];
            } else {
                break;
            }
        }
        for (i, len; i < len; i++) {
            thisLetter = word[i];
            thisKey = keys[thisLetter];
            node.children[thisKey] = new Trie();
            node = node.children[thisKey];
        }
        return node;
    }
};

Trie.prototype.getSuggestions = function (keyString) {
    var result = [];
    var node = this;

    for (var i = 0; i < keyString.length; i++) {
        var thisKey = keyString[i];
        if (!node.children.hasOwnProperty(thisKey)) {
            break;
        }
        node = node.children[thisKey];
    }
    return node.words;
};


function trie() {
    this.Trie = Trie;
    var dict = new this.Trie();

    function processData(allText) {
        words = allText.split('\n');
        words.forEach(function (word) {
            word = word.trim("\r");
            dict.insert(word);
        });
        console.log("Done parsing dictionary");
    }
    const dictionary = fs.readFileSync("server/dictionary.txt", "utf8");
    processData(dictionary);
    this.suggest = (input) => {
        return new Promise((resolve, reject) => {
            resolve(dict.getSuggestions(input));
        })
    }
}

module.exports = trie;