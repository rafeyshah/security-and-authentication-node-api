const https = require("https");
const path = require("path");
const express = require("express");
const fs = require("fs");
const helmet = require("helmet");

const PORT = 8000;

const app = express();

app.use(helmet());

app.get("/secret", (req, res) => {
  return res.send("Your personal secret value is 42!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/hello", (req, res) => {
  return res.send("Hello world");
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// });
