const { User } = require('../models/user.model');

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

module.exports = {
  create,
};
