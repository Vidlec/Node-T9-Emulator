const http = require("express");
const fs = require("fs");
var stdin = process.openStdin();
const dictionary = fs.readFileSync("server/dictionary.txt", "utf8");
const dictionaryWords = dictionary.split(/\s+/g);
var mainWord = "";

stdin.addListener("data", function (d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    const wrote = d.toString().trim();
    mainWord = mainWord + wrote;
    //8378464
    t9("8378464");

});

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


function t9(input) {
    return new Promise((resolve, reject) => {

        const letters = input.split("");
        const wordLength = letters.length - 1;

        var combinations = [];
        var realWords = [];
        var word = "";
        refraction(word, letters, combinations, 0, wordLength);
        console.log(combinations);

    })
}

function refraction(word, letters, combinations, position, length) {
    if (position <= length) {
        for (const possible of values[letters[position]]) {
            var newWord = word + possible;
            refraction(newWord, letters, combinations, position + 1, length);
        }
    } else {
        for (const dictionaryWord of dictionaryWords) {
            if (word === dictionaryWord) {
                combinations.push(word);
            }
        }
    }
}


