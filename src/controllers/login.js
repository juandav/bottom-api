'use strict';
/*
* Module dependencies
*/
import * as status from '../libs/status/status.js';
import * as toJSON from '../libs/toJSON.js';
import * as auth from '../libs/auth.js';

const cms = module.exports;

cms.login = (req, res, next) => {

  let input = toJSON.default(req.body || req.query)();

  let user = input.username;
  let pass = input.password;

  let state = (user && pass) ? true : false;

  if(state) {
    req.db.user.findOne({ user: user }, (err, data) => {
      if(err) {
        status.default('error', null, 500)(res);
      }

      if(data === null) {
        status.default('fail', null, 401)(res);
      }else {
        if(data.access === false) {
          status.default('fail', null, 401)(res);
        }else {
          if(data.pass.trim() !== pass.trim()) {
            status.default('fail', null, 401)(res);
          }else {
            let token = auth.default(
            {
              _id   : data._id,
              day   : 5,
              secret: 'instacash'
            })();
            status.default('success', { token: token }, 200)(res);
          }
        }
      }
    });
  }else {
    status.default('fail', null, 401)(res);
  }
};
