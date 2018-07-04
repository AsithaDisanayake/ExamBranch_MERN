const express = require('express');
const router = express.Router();

// @route   GET api/courses/test
// @desc    Tests courses route
// @access  Public
router.get('/test',(req,res)=>res.json({msg:"course works"}));

module.exports=router;