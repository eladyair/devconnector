const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Checking to see if the passwords matched (the one that was entered and the one that the user has)
        const isMatched = await bcrypt.compare(password, user.password);

        // If passwords don't matched
        if (!isMatched) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // User exist and passwords are matched...
        // |
        // V
        // Creating the payload for jwt using the user id returned from after the save
        const payload = {
            user: {
                id: user.id
            }
        };

        // Creating the token to be send to the client
        jwt.sign(payload, config.get('jwtToken'), { expiresIn: 360000 }, (err, jwtToken) => {
            if (err) {
                throw err;
            }
            // sending the token back to the client
            res.json({ jwtToken });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
