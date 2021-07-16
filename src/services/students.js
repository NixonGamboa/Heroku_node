const { query } = require('express');
const repository = require('../repository/students');

const collection = 'students';

async function getStudents({tags}) {
  const query = tags && { tags: { $in: tags } };
  const students = await repository.getAll(collection,query);
  return students || [];
}
const studentsService = {
  getStudents
};
module.exports = studentsService;
