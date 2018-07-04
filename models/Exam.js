const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExamSchema = new Schema({
 
  examname: {
    type: String,
    required: true
  },
  examyear: {
    type: String,
    required: true
  },
  examsemester: {
    type: String,
    required: true
  },
  examstartdate: {
    type: Date,  

  },
  examstatus: {
    type: String,  

  },

  candidate: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      }
    }
  ],
  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Exam = mongoose.model('exam', ExamSchema);
