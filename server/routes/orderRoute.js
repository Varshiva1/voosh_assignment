const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const authMiddleware = require('../middleware/auth');


router.post('/add-order',authMiddleware, orderController.createOrder);
router.get('/get-order', orderController.getUserOrders);

module.exports = router;
