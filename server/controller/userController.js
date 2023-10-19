const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, password } = req.body;
   
    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this phone number.' });
    }

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


exports.loginUser = async (req, res) => {
  const { phoneNumber, password, login_by } = req.body;
  
  try {
    const user = await User.findOneAndUpdate({ phoneNumber:phoneNumber },{login_by: "mannual"});
console.log(user)
    if (!user) {
      return res.status(401).json({ error: 'User not found. Please register.' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

const JWT_SECRET="voosh"

    const token = jwt.sign( payload, JWT_SECRET,{
        expiresIn: "10h",
      }
    );
      // Response JWT token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
};
