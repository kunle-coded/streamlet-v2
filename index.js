const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  console.log("Request", req.body);
  res.send("Hello, Nodejs!");
});

app.listen("5000", () => {
  console.log("Server started on port 5000");
});
