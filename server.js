// web.js 
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var fs = require("fs");
var forceSSL = require('express-force-ssl');

app.use(logfmt.requestLogger());

// force ssl
// app.use(forceSSL);
// app.set('forceSSLOptions', {
//   enable301Redirects: true,
//   trustXFPHeader: true,
//   httpsPort: process.env.PORT
// });

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use("/public", express.static("public"));
app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});
app.get("/random", function(req, res) {
  var picsDir = __dirname + "/pics";
  fs.readdir(picsDir, function(err, files) {
    if(err) {
        console.log(err);
        res.status(err.status).end();
    }

    var fileIndex = Math.floor((Math.random() * files.length) + 1);
    var fileName = picsDir + "/" + files[fileIndex];
    res.sendFile(fileName, {}, function(err) {
      if(err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
  });

});

console.log(__dirname);
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
