const express = require("express");

const app = express();
const {config} = require("../config/index");

app.get("/", (req, res) => {
  res.send("Holii Monica");
});

app.listen(config.port, () => {
    console.log(config.port)
  console.log(`listen at http://localhost:${config.port}`);
});
