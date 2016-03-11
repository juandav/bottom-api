'use strict';
/*
* Module dependencies
*/
import * as status from '../libs/status/status.js';
import * as toJSON from '../libs/toJSON.js';
import slug   from 'slug';


const cms = module.exports;

cms.allPage = (req,res,next) => {
  let id = req.params.id;

  let state = ( id ) ? true : false;

  if(state){
    req.db.page.findById(id, function (err, data){
      (err) ? status.default('error', null, 500)(res) : (data) ? status.default('success', data, 200)(res) : status.default('fail', null, 400)(res);
    });
  }else{
    req.db.page.find(function(err, data){
      (err) ? status.default('error', null, 500)(res): status.default('success', data, 200 )(res);
    });
  }
}

cms.createPage = (req,res,next) => {
  let input = toJSON.default(req.body || req.query)();
  let state = ( input.body && input.label && input.menu_id ) ? true : false;

  if(state){
    let data = {
      body   : input.body,
      label  : input.label,
      url    : slug(input.label),
      menu_id: input.menu_id,
      last_modified_at: new Date()
    }

    let page = new req.db.page(data);
    page.save(function (err, data) {
      (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);
    });
  }else{
    status.default('fail', null, 400)(res);
  }
}

cms.updatePage = (req,res,next) => {
  let input = toJSON.default(req.body || req.query)();
  let id = req.params.id;

  let state = ( input.body && input.label && input.menu_id ) ? true : false;

  if(state){
    let data = {
      body   : input.body,
      label  : input.label,
      url    : slug(this.body, '_'),
      menu_id: input.menu_id,
      last_modified_at: new Date()
    }

   req.db.page.findById(id, function (err, page){
     if(err){
       status.default('error', null, 500)(res);
     }else{
       page.update(data, function (err, _id){
         (err) ? status.default('error', null, 500)(res) : status.default('success', menu, 200)(res);
       });
     }
   });

  }else{
    status.default('fail', null, 400)(res);
  }
}

cms.deletePage = (req,res,next) => {
  let id = req.params.id;
  let state = ( id ) ? true : false;
  if(state){
    req.db.page.findByIdAndRemove(id, function (err, data){
      (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);;
    });
  }else{
    status.default('fail', null, 400)(res);
  }
}
