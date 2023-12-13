const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

// parser
app.use(cors());
app.use(express.json()); //req body parser

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
