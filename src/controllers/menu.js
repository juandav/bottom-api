'use strict';
/*
* Module dependencies
*/
import * as status from '../libs/status/status.js';
import * as toJSON from '../libs/toJSON.js';

  const cms = module.exports;

/*
  cms.allMenu = (req,res,next) => {
    let id = req.params.id;

    let state = ( id ) ? true : false;

    if(state){
      req.db.menu.findById(id, function (err, data){
        (err) ? status.default('error', null, 500)(res) : (data) ? status.default('success', data, 200)(res) : status.default('fail', null, 400)(res);
      });
    }else{
      req.db.menu.find(function(err, data){
        (err) ? status.default('error', null, 500)(res): status.default('success', data, 200 )(res);
      });
    }
  }
*/

cms.allMenu = (req,res,next) => {

  let id = req.params.id;
  let state = ( id ) ? true : false;

  let Page = req.db.page;
  let Menu = req.db.menu;

  Menu.find({}, function(err, menus) {
    Page.find({}, function(err, pages) {
      var db = {
  			"menu" : []
  		};
      menus.forEach((melement, mindex, marray) => {
        db.menu.push({
          _id  : melement._id,
          title: melement.title,
          pages: []
        });

        let m_menu = String( melement._id );

        pages.forEach((pelement, pindex, parray) => {
          let p_page = String( pelement.menu_id );

          if( m_menu === p_page ) {
            db.menu[mindex].pages.push(pelement);
          }

        });
      });

      status.default('success', db.menu, 200)(res)
    });
  });
}
/*
  page.find({}, function(err, page){

  })
	.lean()
	.populate('menu')
	.exec(function (err, data) {/
		if(err) {
			res.status(500).send({status: 500, error:'Error al intentar devolver data.'});
			return;
		}
		var db = {
			"users" : []
		};

		for(var i in data){
			db.users.push(data[i]['user']);
		}

		res.status(200).send(db);


  //  console.log(data);
});







  //}else{

  //}
}*/

  cms.createMenu = (req,res,next) => {
    let input = toJSON.default(req.body || req.query)();
    let state = ( input.title ) ? true : false;

    if(state){
      let data = {
        title : input.title
      }

      let menu = new req.db.menu(data);
      menu.save(function (err, data) {
        (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);
      });
    }else{
      status.default('fail', null, 400)(res);
    }
  }

  cms.updateMenu = (req,res,next) => {
    let input = toJSON.default(req.body || req.query)();
    let id = req.params.id;

    let state = ( input.title && id ) ? true : false;

    if(state){
      let data = {
        title : input.title,
        date : new Date()
      }

     req.db.menu.findById(id, function (err, menu){
       if(err){
         status.default('error', null, 500)(res);
       }else{
         menu.update(data, function (err, _id){
           (err) ? status.default('error', null, 500)(res) : status.default('success', menu, 200)(res);
         });
       }
     });

    }else{
      status.default('fail', null, 400)(res);
    }
  }

  cms.deleteMenu = (req,res,next) => {
    let id = req.params.id;
    console.log(id);
    let state = ( id ) ? true : false;
    if(state){
      req.db.menu.findByIdAndRemove(id, function (err, data){
        (err) ? status.default('error', null, 500)(res) : status.default('success', data, 200)(res);;
      });
    }else{
      status.default('fail', null, 400)(res);
    }
  }


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
