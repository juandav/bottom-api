'use strict';
/*
* Module dependencies
*/
import fs from 'fs';

const status = JSON.parse(fs.readFileSync(__dirname + '/status.json').toString());

let error = (err, code) => {
  let res = {
    "success": false,
    "status": "error",
    "payload": {},
    "error": {
      "code": code,
      "message": err
    }
  }
  return res;
}

let fail = (err, code) => {
  let res = {
    "success": false,
    "status": "fail",
    "payload": {},
    "error": {
      "code": code,
      "message": err
    }
  }
  return res;
}

let success = (data) => {
  let res = {
    "success": true,
    "status": "success",
    "payload": data,
    "error": {}
  }
  return res;
}

export default (state, data, code) =>{
  return (res) => {
    let response = (state === "success") ? success(data) : (state === "fail") ? fail(status[code], code) : error(status[code], code);
    res.status(code).send(response);
  }
}
