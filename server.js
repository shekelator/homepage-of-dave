// web.js 
const express = require("express");
const logfmt = require("logfmt");
const app = express();
const fs = require("fs");
const forceSSL = require('express-force-ssl');
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    forcePathStyle: false,
    region: "nyc",
    credentials: {
      accessKeyId: process.env.SPACES_ACCESS_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    }
});

let files;
const listCommand = new ListObjectsCommand({ Bucket: "dnix" })
s3Client.send(listCommand)
  .then(d => {
    files = d.Contents;
    console.log(d);
  });
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
  let files;
  const listCommand = new ListObjectsCommand({ Bucket: "dnix" })
  s3Client.send(listCommand)
    .then(d => {
      files = d.Contents;
      console.log(d);
      var fileIndex = Math.floor((Math.random() * files.length) + 1);
      var fileKey = files[fileIndex].Key;
      const picUrl = `https://dnix.nyc3.digitaloceanspaces.com/${fileKey}`;
      console.log(`Redirecting to ${picUrl}`);
      res.redirect(picUrl);
  })
  .catch(e => console.log(e));

});

console.log(__dirname);
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
