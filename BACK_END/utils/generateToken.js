const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const generateToken = (user) => {
    const jti = uuidv4();
    const payload = { 
        userId: user._id,
        email: user.email,
        jti 
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
    });
    return { token, jti };
};

module.exports = generateToken;