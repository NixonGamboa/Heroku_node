const { query } = require("express");
const repository = require("../repository/students-repository");

const collection = "students";

async function getStudents({ tags }) {
  const query = tags && { tags: { $in: tags } };
  const students = await repository.getAll(collection, query);
  return students || [];
}
async function voteStudent(studentId) {
  const student = await repository.getById(collection, studentId);
  if (!student.votes) {
    student.votes = 0;
  }
  const votes = student.votes + 1;
  toUpdate = { votes: votes };
  const votedId = await repository.update(collection, studentId, toUpdate);
  const alls = await repository.getAll(collection);
  const selectedStudents = alls.filter((student) => student.votes);
  const orderedStudents = selectedStudents
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);
  return {orderedStudents,votedId};
}
const studentsService = {
  getStudents,
  voteStudent,
};
module.exports = studentsService;
