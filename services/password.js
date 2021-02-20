const crypto = require('crypto');

class Password {
  static genSalt() {
    return `${Math.round(new Date().valueOf() * Math.random())}`;
  }

  static hash(password, salt) {
    if (!password) return { salt: '', password: '' };

    try {
      if (!salt) {
        salt = this.genSalt();
      }

      const hashed = crypto
        .createHmac('sha1', salt)
        .update(password)
        .digest('hex');
      
      return { salt, password: hashed };
    } catch (err) {
      return { salt: '', password: '' };
    }
  }

  static compare(storedPassData, suppliedPassData) {
    const { password } = this.hash(
      suppliedPassData.password,
      storedPassData.salt
    );

    return password === storedPassData.password;
  }
}

module.exports = { Password };
