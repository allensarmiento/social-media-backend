const { User } = require('../models/user.model');

const create = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  try {
    await user.save();
    return res.status(200).json({
      message: 'Successfully signed up!'
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Error signing up user ' + err
    });
  }
};

module.exports = {
  create,
};
