const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const generateToken = require('../utils/generateToken');
const Token = require("../models/Token.model");


// Register user
exports.userRegister = async (req, res) => {

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
                return res.status(400).json({
                        message: 'It seems you already have an account, please log in instead.'
                });
        }

        // Validate password length
        if (req.body.password.length < 8) {
                return res.status(400).json({
                        message: 'Password must be at least 8 characters long.'
                });
        }

        // Hash password and create user
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = new User({...req.body, passwordHash});

        await user.save();
        res.status(201).json({
                message: 'Account created successfuly'
        });
};

// Login user
exports.userLogin = async (req, res) => {
        try {
                // Find user by email
                const findUser = await User.findOne({ email: req.body.email });
                console.log('User found:', findUser ? 'yes' : 'no'); // Debug log

                if (!findUser) {
                        return res.status(404).json({
                                message: 'User not found'
                        });
                }

                // Compare password
                const validPassword = await bcrypt.compare(req.body.password, findUser.passwordHash);
                if (!validPassword) {
                        return res.status(400).json({
                                message: 'Password is incorrect'
                        });
                }

                // Generate JWT token
                const { token, jti } = generateToken({userId: findUser._id});

                await Token.create({ userId: findUser._id, jti }); // Store the jti in the database

                return res.status(200).json({
                        message: 'Connected successfully',
                        token
                });
        } catch (err) {
                console.error('Login error:', err); // Detailed error log
                res.status(500).json({
                        message: 'Internal server error'
                });
        }
}

// Get user profile
exports.getUser = async (req, res) => {
        try {
                const userId = req.user.id;
                const user = await User.findById(userId).select('-passwordHash');
                if (!user) {
                        return res.status(404).json({
                                message: 'User not found'
                        });
                }
                res.status(200).json(user);
        } catch (err) {
                console.log(err);
                res.status(500).json({
                        message: 'Internal server error'
                });
        }
};

// Update user profile
exports.updateUser = async (req, res) => {
        try {
                const userId = req.user.id;
                const updates = req.body;

                // If password is being updated, hash the new password
                if (updates.password) {
                        if (updates.password.length < 8) {
                                return res.status(400).json({
                                        message: 'Password must be at least 8 characters long.'
                                });
                        }
                        updates.passwordHash = await bcrypt.hash(updates.password, 10);
                        delete updates.password;
                }

                const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-passwordHash');
                if (!updatedUser) {
                        return res.status(404).json({
                                message: 'User not found'
                        });
                }
                res.status(200).json({
                        message: 'Profile updated successfully',
                        user: updatedUser
                });
        } catch (err) {
                console.log(err);
                res.status(500).json({
                        message: 'Internal server error'
                });
        }
};

// Find user by username
exports.findByUsername = async (req, res) => {
        try {
                const username = req.query.username;
                const user = await User.findOne({ username }).select('-passwordHash');
                if (!user) {
                        return res.status(404).json({
                                message: 'User not found'
                        });
                }
                res.status(200).json(user);
        } catch (err) {
                console.log(err);
                res.status(500).json({
                        message: 'Internal server error'
                });
        }
};

// Delete user account
exports.deleteUser = async (req, res) => {
        try {
                const userId = req.user.id;
                await User.findByIdAndDelete(userId);
                res.status(200).json({
                        message: 'User account deleted successfully'
                });
        } catch (err) {
                console.log(err);
                res.status(500).json({
                        message: 'Internal server error'
                });
        }
};

// User logout
exports.userLogout = async (req, res) => {
        try {
                const jti = req.user.jti;

                await Token.updateOne(
                        { jti },
                        { isRevoked: true }
                );
                return res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
        }
};


exports.followUser = async (req, res) => {
        try {
                const userId = req.user.id;
                const targetId = req.params.id;

                if (userId === targetId) {
                return res.status(400).json({ message: "You cannot follow yourself" });
                }

                        const target = await User.findById(targetId);
                        if (!target) {
                        return res.status(404).json({ message: "Target user not found" });
                        }

                // Add target to my following
                await User.findByIdAndUpdate(userId, {
                $addToSet: { following: targetId }
                });

                // Add me to target's followers
                await User.findByIdAndUpdate(targetId, {
                $addToSet: { followers: userId }
                });

                res.status(200).json({ message: "User followed" });
        } catch (err) {
                res.status(500).json({ message: "Error: " + err });
        }
};


exports.unfollowUser = async (req, res) => {
        try {
                const userId = req.user.id;
                const targetId = req.params.id;

                if (userId === targetId) {
                return res.status(400).json({ message: "You cannot unfollow yourself" });
                }

                await User.findByIdAndUpdate(userId, {
                $pull: { following: targetId }
                });

                await User.findByIdAndUpdate(targetId, {
                $pull: { followers: userId }
                });

                res.status(200).json({ message: "User unfollowed" });
        } catch (err) {
                res.status(500).json({ message: "Error: " + err });
        }
};
