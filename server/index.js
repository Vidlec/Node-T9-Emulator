var trie = require("./trie.js");
var naive = require("./naive.js");
var express = require("express");

var Trie = new trie();
var app = express();
var router = express.Router();

app.use("/api",router);
app.use("/",express.static("./client"));
router.route("/suggest")
.get((req,res)=>{
    (req.query.method === "trie")?
    Trie.suggest(req.query.keys).then((result)=>{res.json(result)})  : 
    naive.suggest(req.query.keys).then((result)=>{res.json(result)}); 
})
app.listen(process.env.PORT || 8080);
