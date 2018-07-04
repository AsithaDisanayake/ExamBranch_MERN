const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
// const validateExperienceInput = require('../../validation/experience');
// const validateEducationInput = require('../../validation/education');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// Load Subject Model
const Subject = require('../../models/Subject');


// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {};
  
      Profile.findOne({ user: req.user.id })
        .populate('user', ['username'])
        .then(profile => {
          if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
          }
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    }
  );
 
// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
  
    Profile.find()
      .populate('user', ['username'])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }
  
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
  });



// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
    const errors = {};
  
    Profile.findOne({ handle: req.params.handle })
      .populate('user', ['username'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
  
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  });


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};
  
    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['username'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
  
        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: 'There is no profile for this user' })
      );
  });




// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProfileInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
  
      // Get fields
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.namewithinit) profileFields.namewithinit = req.body.namewithinit;
      if (req.body.fullname) profileFields.fullname = req.body.fullname;
      if (req.body.contactno) profileFields.contactno = req.body.contactno;
      if (req.body.degreetype) profileFields.degreetype = req.body.degreetype;
      if (req.body.field) profileFields.field = req.body.field;
      if (req.body.semester) profileFields.semester = req.body.semester;
      
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create
  
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }
  
            // Save Profile
            new Profile(profileFields).save().then(profile => res.json(profile));
          });
        }
      });
    }
);



// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    }
  );


// @route   POST api/profile/enroll/:id
// @desc    add subject
// @access  Private
// router.post(
//   '/enroll/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {    
//     Subject.findById(req.params.id).then(subject => {
//       Profile.findOne({ user: req.user.id }).then(profile => {        
        
//         // if (
//         //   profile.courses.filter(like => like.subject.toString() === req.params.id)
//         //     .length > 0
//         // ) {
//         //   return res
//         //     .status(400)
//         //     .json({ alreadyliked: 'User already liked this post' });
//         // }
//           subjects = req.params.subject;
//           profile.courses.unshift({subjects});

//           profile.save().then(profile => res.json(profile));

//           res.jason({success:true});
//         })
//         .catch(err => res.status(404).json({ postnotfound: 'subject post found', sub: req.params.subject.id}));
//     });  
//   }
// );


// @route   POST api/profile/enroll
// @desc    Add subject to profile
// @access  Private
router.post(
  '/enroll',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newCourse = {
        subjectid: req.body.subjectid,
        subjectcode: req.body.subjectcode,
        subjectname: req.body.subjectname,
        subjectsemester: req.body.subjectsemester       
        
      };
      res.json({s:req.user.username});
      // Add to exp array
      profile.courses.unshift(newCourse);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/repeat
// @desc    Add repeat to profile
// @access  Private
router.post(
  '/repeat',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newRepeat = {
        subjectid: req.body.subjectid,
        subjectcode: req.body.subjectcode,
        subjectname: req.body.subjectname,
        subjectsemester: req.body.subjectsemester       
        
      };
      // res.json({success:req.user.username});
      // Add to exp array
      profile.repeat.unshift(newRepeat);

      profile.save().then(profile => res.json(profile));
    });
  }
);

  




module.exports=router; 