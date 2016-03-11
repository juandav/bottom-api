'use strict';
/*
* Module dependencies
*/
import * as status from '../libs/status/status.js';
import * as toJSON from '../libs/toJSON.js';

const cms = module.exports;

cms.listAccounts = (req, res, next) => {
  let id = req.params.id;

  let state = (id) ? true : false;

  if(state) {
    req.db.user.findById(id, function(err, data) {
      (err) ? status.default('error', null, 500)(res) : (data) ? status.default('success', data, 200)(res) : status.default('fail', null, 400)(res);
    });
  }else {
    req.db.user.find((err, data) => {
      (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);
    });
  }
};

cms.createAccount = (req, res, next) => {
  let input = toJSON.default(req.body || req.query)();
  let state = (input.name && input.user && input.pass && input.email) ? true : false;

  if(state) {
    let data = {
      name : input.name,
      user : input.user,
      pass : input.pass,
      email: input.email
    };

    let user = new req.db.user(data);
    user.save(function(err, data) {
      (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);
    });
  }else {
    status.default('fail', null, 400)(res);
  }
};

cms.updateAccount = (req, res, next) => {
  let input = toJSON.default(req.body || req.query)();
  let id = req.params.id;

  req.db.user.findById(id, (err, user) => {
    if(err) {
      status.default('error', null, 500)(res);
    }else {
      user.update(input, (err, _id) => {
        (err) ? status.default('error', null, 500)(res) : status.default('success', _id, 200)(res);
      });
    }
  });
};

cms.deleteAccount = (req, res, next) => {
  let id = req.params.id;
  let state = (id) ? true : false;
  if(state) {
    req.db.user.findByIdAndRemove(id, function(err, data) {
      (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);
    });
  }else {
    status.default('fail', null, 400)(res);
  }
};
