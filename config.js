const ipAddress = process.env.IP || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';

const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'JWT_SECRET',
  mongoUri: process.env.MONGO_URI ||
    `mongodb://${ipAddress}:${mongoPort}`,
  mongoDbName: process.env.MONGODB_DBNAME || 'socialmedia',
  mongoUser: process.env.MONGODB_ADMINUSERNAME,
  mongoPassword: process.env.MONGODB_ADMINPASSWORD
};

module.exports = config;
