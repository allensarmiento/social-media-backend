const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill in a valid email'],
    required: 'Email is required',
  },
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },

  about: {
    type: String,
    trim: true,
  },
  profile_photo: {
    data: Buffer,
    contentType: String,
  },
  following: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User',
  }],
  followers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('User', UserSchema);
