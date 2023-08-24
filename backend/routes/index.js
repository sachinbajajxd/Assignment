const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bodyParser = require('body-parser');
// const {pageNotFound} = require('../controllers/userController');

// Define routes
// router.get("/",(req,res)=>{
//     console.log("connect");
// });
router.get('/', userController.Home);
router.get('/users', userController.getUsers);
router.post('/submit-form', bodyParser.urlencoded({ extended: true }),  userController.submitForm);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;