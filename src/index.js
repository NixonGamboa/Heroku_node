const express = require("express");
const cors = require("cors");

const app = express();
const { config } = require("../config/index");
const studentsApi = require("./controller/index");
app.use(cors());
studentsApi(app);

app.listen(config.port, () => {
  console.log(`listen at http://localhost:${config.port}`);
});
