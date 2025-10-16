const express = require('express');
const router = express.Router();

router.post('/api/users/register', async (req, res) => {
	const User = require('../models/User');
	const user = new User(req.body);

	const password = req.body.passwordHash;
	user.passwordHash = await bcrypt.hash(password, 10);

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(400).json({
			message: 'It seems you already have an account, please log in instead.'
		});
        }

	await user.save();
	res.status(201).json({
                messages: 'Account created succefuly'
        });
});

router.post('/api/users/login', async (req, res) => {
        try {
                const User = require('../models/User');
                const findUser = await User.findOne({ email: req.body.email });
                if (!findUser) {
                        res.status(404).json({
                                message: 'User not found'
                        });
                        return;
                }

                const validPassword = await bcrypt.compare(req.body.password, findUser.passwordHash);
		if (!validPassword) {
                        res.status(400).json({
                                message: 'Password is incorrect'
                        });
                        return;
                }
                res.status(200).json({
                        message: 'Connected succefully'
                });
        } catch (err) {
                console.log(err);
                res.status(500).json({
                        message: 'Internal server error'
                });
                return;
        }
});
