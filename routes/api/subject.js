const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateSubjectInput = require('../../validation/subject');

// Load User model
const Subject = require('../../models/Subject');


// @route   POST api/subject/insert
// @desc    Register user
// @access  Public
router.post('/subject', (req, res) => { 
  const { errors, isValid } = validateSubjectInput(req.body);

   // Check Validation
if (!isValid) {
  return res.status(400).json(errors);
}

  Subject.findOne({ subjectcode: req.body.subjectcode }).then(subject => {
    if (subject) {
      errors.subjectcode = 'subject already exists';
      return res.status(400).json(errors);
    } else {

     

      const newSubject = new Subject({          
        subjectcode: req.body.subjectcode,
        subjectname: req.body.subjectname,    
        degreetype: req.body.degreetype,
        stream: req.body.stream,
        semester: req.body.semester
      });
      
       newSubject.save().then(subject => res.json(subject));
    

      
    }
  });
});

// @route   GET api/subject/all
// @desc    Get all subjects
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Subject.find()
    .populate('subject', ['subjectcode'])
    .then(subjects => {
      if (!subjects) {
        errors.nosubjects = 'There are no sub';
        return res.status(404).json(errors);
      }

      res.json(subjects);
    })
    .catch(err => res.status(404).json({ subject: 'There are no sub' }));
});







// @route   GET api/subject/subjectcode/:subjectcode
// @desc    Get subject by subjectcode
// @access  Public

router.get('/subjectcode/:subjectcode', (req, res) => {
  const errors = {};

  Subject.findOne({ subjectcode: req.params.subjectcode })
    .populate('subject', ['subjectcode'])
    .then(subject => {
      if (!subject) {
        errors.nosubject = 'There is no subject';
        res.status(404).json(errors);
      }

      res.json(subject);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/subject/semester/:semester
// @desc    Get subject by semester
// @access  Public

router.get('/semester/:semester', (req, res) => {
  const errors = {};

  Subject.findById( req.params.semester )
    .populate('semester', ['semester'])
    .then(subject => {
      if (!subject) {
        errors.nosubject = 'There is no subject';
        res.status(404).json(errors);
      }

      // res.json(subject);
    }) 
    .catch(err => res.status(404).json(err));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Subject.findById(req.params.id)
    .then(subject => res.json(subject))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});


// @route   DELETE api/subject/:id
// @desc    Delete subject
// @access  Private
router.delete("/:id", (req, res) => { 
  Subject.findById(req.params.id);
  Subject
    .remove()
    .then(() => res.json({ success: true }))
    .catch(err =>
      res.status(404).json({ nosubjectfound: "No subject found with that ID" })
    );
});
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ subject: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
 



module.exports=router; 