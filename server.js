var http = require("http");
console.log("Running da app!");

var server = http.createServer(function(request, response)) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("Yo dawg\n");
});

server.listen(process.env.PORT);