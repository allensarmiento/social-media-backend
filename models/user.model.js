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
    required: 'Email is required',
  },
  password: {
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
  photo: {
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

const User = mongoose.model('User', UserSchema);

module.exports = { User };
