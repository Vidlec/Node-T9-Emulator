var trie = require("./trie.js");
var naive = require("./naive.js");
var express = require("express");
//var bodyParser = require("body-parser");

var Trie = new trie();
var app = express();
//app.use(bodyParser());
var router = express.Router();

app.use("/api",router);
router.route("/suggest")
.get((req,res)=>{
    //console.log(req.query);
    Trie.suggest(req.query.keys).then((result)=>{res.json(result)});
})
const webServer = app.listen(8080);






//naive.suggest("8378464").then((result)=>{console.log(result)});
//Trie.suggest("8378464").then((result)=>{console.log(result)});
//Trie.suggest("4663").then((result)=>{console.log(result)});
//Trie.suggest("83").then((result)=>{console.log(result)});

