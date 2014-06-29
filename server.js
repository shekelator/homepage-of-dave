// web.js 
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use("/public", express.static("public"));
app.get('/', function(req, res) {
  res.render("index", { title: "Home" });
});
console.log(__dirname);
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
