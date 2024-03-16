'use strict'

const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');


//set session
router.post('/access/set-session', asyncHandler(accessController.setSession));
    
//get session
router.post('/access/get-session', asyncHandler(accessController.getSession));

//signUp
router.post('/access/signup', asyncHandler(accessController.signUp));

module.exports = router