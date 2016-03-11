'use strict';
/*
* Module dependencies
*/
import * as status from '../libs/status/status.js';
import * as toJSON from '../libs/toJSON.js';
import * as auth   from '../libs/auth.js';

const cms = module.exports;

cms.allPost = (req,res,next) => {
  let id = req.params.id;

  let state = ( id ) ? true : false;

  if(state){
    req.db.post.findById(id, function (err, data){
      (err) ? status.default('error', null, 500)(res) : (data) ? status.default('success', data, 200)(res) : status.default('fail', null, 400)(res);
    });
  }else{
    req.db.post.find(function(err, data){
      (err) ? status.default('error', null, 500)(res): status.default('success', data, 200 )(res);
    });
  }
}

cms.createPost = (req,res,next) => {

  try {

    let input = toJSON.default(req.body || req.query)();
    let state = ( input.title && input.state && input.content && input.blog_id ) ? true : false;

    if(state) {
      let token_encode = req.header('Authorization');
      let token_decode = auth.decode(token_encode, 'instacash');

      let data = {
        title         : input.title,
        state         : input.state,
        content       : input.content,
        blog_id       : input.blog_id,
        author        : token_decode.sub,
        published_date: new Date()
      }

      let post = new req.db.post(data);

      post.save(function (err, data) {
        (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);
      });

    } else {
      status.default('fail', null, 400)(res);
    }

  } catch (e) {

    console.log(e);
    status.default('error', null, 500)(res);

  }

}

cms.updatePost = (req,res,next) => {
  let input = toJSON.default(req.body || req.query)();
  let id = req.params.id;

  let state = ( input.title && input.state && input.content && input.blog_id && input.author ) ? true : false;

  if(state){
    let data = {
      title         : input.title,
      state         : input.state,
      content       : input.content,
      blog_id       : input.blog_id,
      author        : input.author,
      published_date: new Date()
    }

   req.db.post.findById(id, function (err, post){
     if(err){
       status.default('error', null, 500)(res);
     }else{
       post.update(data, function (err, _id){
         (err) ? status.default('error', null, 500)(res) : status.default('success', menu, 200)(res);
       });
     }
   });

  }else{
    status.default('fail', null, 400)(res);
  }
}

cms.deletePost = (req,res,next) => {
  let id = req.params.id;
  let state = ( id ) ? true : false;
  if(state){
    req.db.post.findByIdAndRemove(id, function (err, data){
      (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);;
    });
  }else{
    status.default('fail', null, 400)(res);
  }
}
