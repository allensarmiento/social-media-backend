const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { Password } = require('../services/password');
const config = require('../config');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      error: 'Error signing up user'
    });
  }

  const user = new User({ name, email, password });

  try {
    await user.save();
    return res.status(200).json({
      msg: 'Successfully signed up!'
    });
  } catch (err) {
    return res.status(400).json({
      error: 'Error signing up user ' + err
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const authenticated = Password.compare(
      { password: user.password, salt: user.salt},
      { password }
    );

    if (!authenticated) {
      return res.status(401).send({
        error: 'Email and password don\'t match'
      });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error: 'Could not log in'
    });
  }
};

module.exports = {
  create,
  signin
};
