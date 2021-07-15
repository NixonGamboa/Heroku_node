const repository = require('../lib/mongo');

const collection = 'students';

async function getStudents() {
  const students = await repository.getAll(collection);
  return students || [];
}
const studentsService = {
  getStudents
};
module.exports = studentsService;
