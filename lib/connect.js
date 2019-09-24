const { parse } = require('url');
const mongoose = require('mongoose');

const log = (event, dbUrl) => () => {
  console.log(`${event.toUpperCase()}: connection to ${dbUrl}`);
};

const redactURLAuth = url => {
  const parsedUrl = parse(url);
  const redactedAuth = parsedUrl.auth ? '***:***@' : '';

  return `${parsedUrl.protocol}//${redactedAuth}${parsedUrl.hostname}:${parsedUrl.port}${parsedUrl.path}`;
};

module.exports = connect = (dbUrl = process.env.MONGODB_URI) => {
  mongoose.connect(dbUrl, {
    useNewUrlParse: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  const redactedUrl = redactURLAuth(dbUrl);
  mongoose.connection.on('error', log('error', redactedUrl));
  mongoose.connection.on('open', log('open', redactedUrl));
  mongoose.connection.on('close', log('close', redactedUrl));

  process.on('SIGINT', () => {
    mongoose.connect.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

};