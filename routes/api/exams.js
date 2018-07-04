const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Exam model
const Exam = require("../../models/Exam");

// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateExamInput = require("../../validation/Exam");

// @route   GET api/Exams/test
// @desc    Tests Exam route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Exams Works" }));

// @route   GET api/Exams
// @desc    Get Exams
// @access  Public
router.get("/", (req, res) => {
  Exam.find()
    .sort({ date: -1 })
    .then(exams => res.json(exams))
    .catch(err => res.status(404).json({ noexamsfound: "No exams found" }));
});

// @route   GET api/exams/:id
// @desc    Get Exam by id
// @access  Public
router.get("/:id", (req, res) => {
  Exam.findById(req.params.id)
    .then(exam => res.json(exam))
    .catch(err =>
      res.status(404).json({ noexamfound: "No exam found with that ID" })
    );
});

// @route   POST api/exams
// @desc    Create post
// @access  Private
router.post(
  "/exam",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExamInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newExam = new Exam({
      examname: req.body.examname,
      examyear: req.body.examyear,
      examsemester: req.body.examsemester,
      examstartdate: req.body.examstartdate,
      examstatus: req.body.examsemester
    });

    newExam.save().then(exam => res.json(exam));
  }
);

// @route   DELETE api/exams/:id
// @desc    Delete post
// @access  Private

router.delete("/:id", (req, res) => { 
  Exam.findById(req.params.id);
  Exam
    .remove()
    .then(() => res.json({ success: true }))
    .catch(err =>
      res.status(404).json({ noexamfound: "No exam found with that ID" })
    );
});

// @route   exam api/exams/like/:id
// @desc    Like exam
// @access  Private
router.post(
  '/register/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Exam.findById(req.params.id)
        .then(exam => {
          if (
            exam.candidate.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyRegister: 'User already Register this exam' });
          }

          // Add user id to Candidate array
          exam.candidate.unshift({ user: req.user.id });

          exam.save().then(exam => res.json(exam));
        })
        .catch(err => res.status(404).json({ examnotfound: 'No exam found' }));
    });
  }
);


module.exports = router;
