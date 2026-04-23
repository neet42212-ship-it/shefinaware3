const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: true },
  age: { type: Number, default: null },
  income: { type: Number, default: null },
  location: { type: String, default: null },
  goals: { type: String, default: null },
  progress: {
    modulesCompleted: { type: Number, default: 0 },
    profileStrength: { type: Number, default: 0 },
    streak: { type: Number, default: 1 }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
