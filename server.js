// web.js 
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(__dirname + "/public"));
app.get('/', function(req, res) {
  res.render("index", { title: "Home" });
});
console.log(__dirname);
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
/*
var http = require("http");
console.log("Running da app!");

var server = http.createServer(function(request, response)) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("Yo dawg\n");
});

server.listen(process.env.PORT);
*/