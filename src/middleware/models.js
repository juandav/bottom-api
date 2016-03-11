'use strict';

/*
* Module dependencies
*/
import mongoose from 'mongoose';
import * as config from '../config.js';

const getConnectionString = () => {
  return 'mongodb://127.0.0.1:27017/cms';
};

mongoose.connect(getConnectionString(), (err) => {
  (err) ? console.log('err connection') : console.log('successful connection');
});

const model = {
  mongoose: mongoose,
  blog    : require('../models/blog')(mongoose),
  menu    : require('../models/menu')(mongoose),
  page    : require('../models/page')(mongoose),
  post    : require('../models/post')(mongoose)
};

module.exports = (req, res, next) => {
  req.db = model;
  next();
};
