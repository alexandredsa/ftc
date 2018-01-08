const mongoose = require('mongoose');
mongoose.Promise = Promise;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const DBConfig = require('../config/DBConfig');
const DBUrl  = (typeof DBConfig[process.env.NODE_ENV] !== 'undefined') ?
  DBConfig[process.env.NODE_ENV] :
  DBConfig.default;

module.exports = () => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DBUrl, {}, (err) => {
      if(err) {
        console.error(err);
        reject(err);
        process.exit(1);
      }
      else {
        console.info(`[${process.env.NODE_ENV}] DB connection successful`);
        resolve();

        mongoose.connection.on('disconnected', () => {
          console.warn('Mongoose connection disconnected from DB');
        });

        mongoose.connection.on("connected", (ref) => {
          console.info('DB reconnection successful');
        });

        mongoose.connection.on("error", (err) => {
          console.error('Mongoose reached limit of retries', err);
          process.exit(1);
        });
      }
    });
  });
};