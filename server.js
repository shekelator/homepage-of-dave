// web.js 
const express = require("express");
const logfmt = require("logfmt");
const app = express();
const { S3Client, ListObjectsCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    forcePathStyle: false,
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.SPACES_ACCESS_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    }
});

app.use(logfmt.requestLogger(function(req, res) {
  return {
    method: req.method,
    path: req.url,
    status: res.statusCode
  }
}));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use("/public", express.static("public"));
app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});
app.get("/random", function(req, res) {
  let files;
  const listCommand = new ListObjectsCommand({ Bucket: "dnix", Prefix: "family-pics" })
  s3Client.send(listCommand)
    .then(d => {
      files = d.Contents;
      var fileIndex = Math.floor((Math.random() * files.length) + 1);
      var fileKey = files[fileIndex].Key;

      const getObjectCmd = new GetObjectCommand({ Bucket: "dnix", Key: fileKey });

      s3Client.send(getObjectCmd)
        .then(d => {
          d.Body.pipe(res);
        })
        .catch(e => console.log(e));

  })
  .catch(e => console.log(e));
});

console.log(__dirname);
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
