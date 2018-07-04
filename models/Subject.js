const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubjectSchema = new Schema({
 
  subjectcode: {
    type: String,
    required: true,
    max: 40
  },
  subjectname: {
    type: String
  },
  degreetype: {
    type: String
  },
  stream: {
    type: String,
    required: true
  },
  semester: {
    type: String,   
    required: true
     
  },  
  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = subject = mongoose.model('subjects', SubjectSchema);
