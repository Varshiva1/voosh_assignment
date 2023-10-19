const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/auth');

router.post('/add-user', userController.registerUser);
router.post('/login-user', userController.loginUser);

module.exports = router;
