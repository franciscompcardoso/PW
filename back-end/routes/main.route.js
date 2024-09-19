const express = require('express'); 
const app = express();  
const router = require('express').Router();
const controllerUser = require('../controllers/user.controller.js');

const path = require('path');
const userController = require('../controllers/user.controller.js');

const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");


router.get('/user/', controllerUser.read);
router.get('/user/inf/:email', userController.readUserInfo);


module.exports = router;