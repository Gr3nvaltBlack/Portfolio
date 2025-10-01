const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio:      { type: String, default: '' },
  createdAt:{ type: Date, default: Date.now }
});

// Exemple de méthode statique pour chercher un utilisateur par email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
