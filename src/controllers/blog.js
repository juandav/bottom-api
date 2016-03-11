'use strict';
/*
* Module dependencies
*/
import * as status from '../libs/status/status.js';
import * as toJSON from '../libs/toJSON.js';

const cms = module.exports;

cms.allBlog = (req,res,next) => {
  let id = req.params.id;

  let state = ( id ) ? true : false;

  if(state){
    req.db.blog.findById(id, function (err, data){
      (err) ? status.default('error', null, 500)(res) : (data) ? status.default('success', data, 200)(res) : status.default('fail', null, 400)(res);
    });
  }else{
    req.db.blog.find(function(err, data){
      (err) ? status.default('error', null, 500)(res): status.default('success', data, 200 )(res);
    });
  }
}

  cms.createBlog = (req,res,next) => {
    let input = toJSON.default(req.body || req.query)();
    let state = ( input.name ) ? true : false;

    if(state){
      let data = {
        name : input.name
      }

      let blog = new req.db.blog(data);
      blog.save(function (err, data) {
        (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);
      });
    }else{
      status.default('fail', null, 400)(res);
    }
  }

  cms.updateBlog = (req,res,next) => {
    let input = toJSON.default(req.body || req.query)();
    let id = req.params.id;

    let state = ( input.name && id ) ? true : false;

    if(state){
      let data = {
        name : input.name,
        date : new Date()
      }

     req.db.blog.findById(id, function (err, blog){
       if(err){
         status.default('error', null, 500)(res);
       }else{
         blog.update(data, function (err, _id){
           (err) ? status.default('error', null, 500)(res) : status.default('success', blog, 200)(res);
         });
       }
     });

    }else{
      status.default('fail', null, 400)(res);
    }
  }

  cms.deleteBlog = (req,res,next) => {
    let id = req.params.id;
    let state = ( id ) ? true : false;
    if(state){
      req.db.blog.findByIdAndRemove(id, function (err, data){
        (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);;
      });
    }else{
      status.default('fail', null, 400)(res);
    }
  }
