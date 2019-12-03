const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            // If user exist
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exist' }] });
            }

            // Getting the user avatar by its email
            const avatar = gravatar.url(email, {
                s: '200', // default size
                r: 'pg', // rating (only pg rating - no naked)
                d: 'mm' // default image
            });

            // Creating a new user instance using the User schema
            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt password

            // Creating a salt to hash the password
            const salt = await bcrypt.genSalt(10);
            // Hashing the user password
            user.password = await bcrypt.hash(password, salt);
            // Saving the user to the DB
            await user.save();

            // Return a json web token

            // Creating the payload for jwt using the user id returned from after the save
            const payload = {
                user: {
                    id: user.id
                }
            };

            // Creating the token to be send to the client
            jwt.sign(payload, config.get('jwtToken'), { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    throw err;
                }
                // sending the token back to the client
                res.json({ token });
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
