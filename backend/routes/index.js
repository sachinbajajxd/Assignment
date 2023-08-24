const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bodyParser = require('body-parser');

router.get('/', userController.Home);
router.get('/users', userController.getUsers);
router.post('/submit-form', bodyParser.urlencoded({ extended: true }),  userController.submitForm);
router.put('/users/:id', bodyParser.urlencoded({ extended: true }), userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/send-email', userController.sendMails);

module.exports = router;