'use strict';

/*
* Collection of pages
*/
module.exports = (mongoose) => {

  let Schema = mongoose.Schema;

  let PageSchema = new Schema(
  {
    menu_id : { type: Schema.ObjectId, ref: "menu"},
    body    : { type: 'String', required: true },
    label   : { type: 'String', required: true },
    url     : { type: 'String', required: true },
    last_modified_at : {type:Date, default: new Date()}
  }, {collection:'page'});
  return mongoose.model('page', PageSchema);
}
