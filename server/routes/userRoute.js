const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/auth');

router.post('/add-user',authMiddleware, userController.registerUser);
router.post('/login-user',authMiddleware, userController.loginUser);

module.exports = router;
