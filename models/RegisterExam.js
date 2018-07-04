const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RegisterExamSchema = new Schema({
 
  examid: {
    type: String,
    required: true
  },
  studentid: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = RegisterExam = mongoose.model('registerexam', RegisterExamSchema);
