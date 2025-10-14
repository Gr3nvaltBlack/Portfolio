const mongoose = require('mongoose');
const {isEmail} = require('validator');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxLength: 20, minLength: 3 },
  email:    { type: String, required: true, unique: true, lowerCase: true, validate: [isEmail], trim: true },
  passwordHash: { type: String, required: true, trim: true, minLength: 8, maxLength: 1024 },
  profilePic: { type: String, default: ''},
  bio:      { type: String, default: '', maxLength: 150 },
  createdAt:{ type: Date, default: Date.now }
});

// Static method to find user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
