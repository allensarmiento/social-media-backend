const crypto = require('crypto');

class Password {
  static genSalt() {
    return `${Math.round(new Date().valueOf() * Math.random())}`;
  }

  static hash(password) {
    if (!password) return { salt: '', password: '' };

    try {
      const salt = this.genSalt();
      const hashed = crypto
        .createHmac('sha1', salt)
        .update(password)
        .digest('hex');
      
      return { salt, password: hashed };
    } catch (err) {
      return { salt: '', password: '' };
    }
  }
}

module.exports = { Password };
