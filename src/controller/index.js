const express = require("express");

const studentsService = require("../services/students");

function studentsApi(app) {
  const router = express.Router();
  app.use("/api/sofkau/students", router);

  router.get("/", async (req, res, next) => {
    const { tags } = req.query;  
    try {
        const students =  await studentsService.getStudents({ tags });
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
