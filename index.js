const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: config.mongoDbName,
  user: config.mongoUser,
  pass: config.mongoPassword
}).then(() => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (error) => {
  console.log(error);
  throw new Error(`could not connect to mongodb database: ${config.mongoUri}`);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
