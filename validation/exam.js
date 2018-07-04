const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExamInput(data) {
  let errors = {};

  data.examname = !isEmpty(data.examname) ? data.examname : '';
  data.examyear = !isEmpty(data.examyear) ? data.examyear : '';

  data.examsemester = !isEmpty(data.examsemester) ? data.examsemester : '';


  // if (!Validator.isLength(data.examname, { min: 10, max: 300 })) {
  //   errors.examname = 'Exam must be between 10 and 300 characters';
  // }

  if (Validator.isEmpty(data.examname)) {
    errors.examname = 'exam name field is required';
  }
  if (Validator.isEmpty(data.examyear)) {
    errors.examyear = ' year is required';
  }
  if (Validator.isEmpty(data.examsemester)) {
    errors.examsemester = ' semester is required';
  }
 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
