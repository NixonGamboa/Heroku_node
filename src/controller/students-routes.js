const express = require("express");

const studentsService = require("../services/students-services");
const { studentIdSchema } = require("../utils/schemas/schemaId");
const validationHandler = require("../utils/validation-handler");

function studentsApi(app) {
  const router = express.Router();
  app.use("/api/sofkau/students", router);

  router.get("/", async (req, res, next) => {
    const { tags } = req.query;
    try {
      const students = await studentsService.getStudents({ tags });
      res.status(200).json({
        data: students,
        message: "students listed",
      });
    } catch {
      next(err);
    }
  });
  router.get("/ranking", async (req, res, next) => {
    try {
      const students = await studentsService.getRanking();
      res.status(200).json({
        data: { orderedStudents: students },
        message: "students listed",
      });
    } catch {
      next(err);
    }
  });
  router.patch(
    "/:studentId/",
    validationHandler({ studentId: studentIdSchema }, "params"),
    async (req, res, next) => {
      const { studentId } = req.params;
      try {
        const rankingStudent = await studentsService.voteStudent(studentId);
        res.status(200).json({
          data: rankingStudent,
          message: "successful vote",
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = studentsApi;
