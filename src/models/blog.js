'use strict';

/*
* Collection of blogs
*/
module.exports = (mongoose) => {

  let Schema = mongoose.Schema;

  let BlogSchema = new Schema(
    {
      name: { type: 'String', required: true },
      date: { type: Date, default: new Date()}
    }, { collection: 'blog' });

  return mongoose.model('blog', BlogSchema);
};
