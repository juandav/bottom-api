'use strict';

/*
* Collection of menus
*/
module.exports = (mongoose) => {

  let Schema = mongoose.Schema;

  let MenuSchema = new Schema(
  {
    title: { type: 'String', required: true },
    date : {type:Date, default: new Date()}
  }, {collection:'menu'});
  return mongoose.model('menu', MenuSchema);
}
