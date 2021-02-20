const mongoose = require('mongoose');
const { Password } = require('../services/password');

const userSchema = new mongoose.Schema({
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

userSchema.pre('save', function(done) {
  if (this.isModified('password')) {
    const { salt, password: hashed } = Password.hash(this.get('password'));
    this.set('password', hashed);
    this.set('salt', salt);
  }
  done();
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
