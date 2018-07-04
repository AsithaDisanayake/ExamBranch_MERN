const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  // data.status = !isEmpty(data.status) ? data.status : '';
  

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 4 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Index no is required';
  }

  if (Validator.isEmpty(data.namewithinit)) {
    errors.namewithinit = 'namewithinit field is required';
  }

  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = 'fullname field is required';
  }

  
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

