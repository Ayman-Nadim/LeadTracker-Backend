const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth');

const User = require('../models/user.model');

router.get('/me', authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
