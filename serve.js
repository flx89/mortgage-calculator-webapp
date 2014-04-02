var express = require("express"), app = express();
app.use(express.static(__dirname + "/dist"));
console.log("serving on 1234");
app.listen(1234);