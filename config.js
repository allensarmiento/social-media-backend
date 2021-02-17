const ipAddress = process.env.IP || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';

const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'JWT_SECRET',
  mongoUri: process.env.MONGODB_URI ||
    `mongodb://${ipAddress}:${mongoPort}/socialmedia`,
};

module.exports = config;
