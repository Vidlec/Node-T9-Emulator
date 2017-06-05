# Node-T9-Emulator
Server side T9 emulator with prefix trees and react GUI.

# Install
  - clone or download
# Usage
```js
$ node server
```
  - go to localhost:8080
  


You can also:
  - Use API at localhost:8080/api/suggest?
  - You need two parameters. method=[trie/naive] & keys=[dial keys]

Naive method returns array of all possible word combination, and trie method returns only real words.