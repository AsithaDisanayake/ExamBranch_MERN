const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  namewithinit: {
    type: String
  },
  fullname: {
    type: String
  },
  contactno: {
    type: String,
    required: true
  },
  degreetype: {
    type: String,
    
  },
  field: {
    type: String
    
   
  },
  year: {
    type: String
    
     
  },
  courses: [
    {
    subjectcode: {
      type: String,
     
    },
    subjectname: {
      type: String
    },    
   
    subjectsemester: {
      type: String       
       
    }
  }
  ],
  repeat: [
    {
    subjectcode: {
      type: String,
     
    },
    subjectname: {
      type: String
    },    
   
    subjectsemester: {
      type: String       
       
    }
  }
  ],
  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
