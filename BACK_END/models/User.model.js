const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxLength: 20, minLength: 3 },
  email:    { type: String, required: true, unique: true, lowerCase: true, validate: [isEmail], trim: true },
  passwordHash: { type: String, required: true, trim: true, minLength: 8, maxLength: 1024 },
  profilePic: { type: String, default: ''},
  bio:      { type: String, default: '', maxLength: 150 },
  createdAt:{ type: Date, default: Date.now }
});

// Pre-save hook to hash password if modified
/**userSchema.pre('save', async function(next){
  if (!this.isModified('passwordHash')) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (err) {
    next(err);
  }
});**/

// Static method to find user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

module.exports = mongoose.model('User', userSchema);