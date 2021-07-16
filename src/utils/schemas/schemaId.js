const joi = require("@hapi/joi");

const studentIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

module.exports = {
  studentIdSchema,
};
