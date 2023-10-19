const Order = require('../model/orderModel');

// Controller for creating a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, subTotal, phoneNumber } = req.body;
    
    // Validate input data here
    
    const order = new Order({
      userId,
      subTotal,
      phoneNumber,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the order.' });
  }
};

// Controller for getting order details for a specific user
exports.getUserOrders = async (req, res) => {
  const userId = req.query.user_id;

  try {
    let orders;

    if (userId) {
      // Fetch orders for the user with the provided user_id
      orders = await Order.find({ userId });
    } else {
      // If no userId is provided, fetch all orders
      orders = await Order.find();
    }

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user orders.' });
  }
};
