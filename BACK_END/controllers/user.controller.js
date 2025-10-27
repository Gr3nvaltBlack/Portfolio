const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const { isJWT } = require('validator');

// Register user
exports.userRegister = async (req, res) => {
        console.log('userRegister called with data:', req.body);

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
                return res.status(400).json({
                        message: 'It seems you already have an account, please log in instead.'
                });
        }

        const passwordHash = await bcrypt.hash(req.body.password, 10);
        if (passwordHash.length < 8) {
                return res.status(400).json({
                        message: 'Password must be at least 8 characters long.'
                });
        }
        const user = new User({...req.body, passwordHash});

        await user.save();
        res.status(201).json({
                message: 'Account created successfuly'
        });
};

// Login user
exports.userLogin = async (req, res) => {
        try {
                const findUser = await User.findOne({ email: req.body.email });
                if (!findUser) {
                        return res.status(404).json({
                                message: 'User not found'
                        });
                }

                const validPassword = await bcrypt.compare(req.body.password, findUser.passwordHash);
                if (!validPassword) {
                        return res.status(400).json({
                                message: 'Password is incorrect'
                        });
                }
                const token = jwt.sign(
                        { id: findUser._id, email: findUser.email },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.EXPIRES_IN }
                );

                return res.status(200).json({
                        message: 'Connected successfully',
                        token
                });
        } catch (err) {
                console.log(err);
                res.status(500).json({
                        message: 'Internal server error'
                });
                return;
        }
}
