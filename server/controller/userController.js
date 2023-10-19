const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const config = require('../config');

// Controller for registering a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, password } = req.body;
    
    // Validate input data here
    
    // Check if the user with the provided phone number already exists
    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this phone number.' });
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      phoneNumber,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register the user.' });
  }
};

// Controller for user login
exports.loginUser = async (req, res) => {
  const { phoneNumber, password, login_by } = req.body;
  
  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(401).json({ error: 'User not found. Please register.' });
    }

    // Check the login_by parameter and handle Google Sign-In logic if needed
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
};
