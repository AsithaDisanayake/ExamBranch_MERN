const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSubjectInput(data) {
  let errors = {};

  data.subjectcode = !isEmpty(data.subjectcode) ? data.subjectcode : '';
  data.subjectname = !isEmpty(data.subjectname) ? data.subjectname : '';
  data.semester = !isEmpty(data.semester) ? data.semester : '';

  if (Validator.isEmpty(data.subjectcode)) {
    errors.subjectcode = ' subjectcode field is required';
  }

  if (Validator.isEmpty(data.subjectname)) {
    errors.subjectname = 'subjectname field is required';
  }

  if (Validator.isEmpty(data.semester)) {
    errors.semester = 'semester date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
