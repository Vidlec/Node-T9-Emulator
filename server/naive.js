const fs = require("fs");
const dictionary = fs.readFileSync("server/dictionary.txt", "utf8");
const dictionaryWords = dictionary.split(/\s+/g);

const values = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
}

//This implementation generates all possible words
//Very inefective when searching for longer words

var t9 = function (input) {
    return new Promise((resolve, reject) => {

        const letters = input.split("");
        const wordLength = letters.length - 1;

        var combinations = [];
        var realWords = [];
        var word = "";
        refraction(word, letters, combinations, 0, wordLength);
        resolve(combinations);
    })
}

function refraction(word, letters, combinations, position, length) {
    if (position <= length) {
        for (const possible of values[letters[position]]) {
            var newWord = word + possible;
            refraction(newWord, letters, combinations, position + 1, length);
        }
    } else {
        combinations.push(word);
    }
}
exports.suggest = t9;