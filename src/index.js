const express = require("express");

const app = express();
const { config } = require("../config/index");
const studentsApi = require("./controller/index");

studentsApi(app);

app.listen(config.port, () => {
  console.log(`listen at http://localhost:${config.port}`);
});
