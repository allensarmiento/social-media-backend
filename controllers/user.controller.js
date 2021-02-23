const { User } = require('../models/user.model');

const list = async (req, res) => {
  try {
    User.find({}, 'name email updated created', (err, users) => {
      if (err) {
        return res.status(400).json({
          error: 'Error retrieving users'
        });
      }

      return res.json(users);
    });
  } catch (err) {
    return res.status(400).json({
      error: 'Something went wrong'
    });
  }
};

module.exports = {
  list
};
