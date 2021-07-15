const express = require("express");

//const studentsService = require("");

function studentsApi(app) {
  const router = express.Router();
  app.use("/api/sofkau/students", router);

  router.get("/", async (req, res, next) => {
      try {
        const students =  { name: "Nixon" };
        res.status(200).json({
          data: students,
          message: "students listed",
        });
      } catch {
        next(err);
      }
    });
}

module.exports = studentsApi;
