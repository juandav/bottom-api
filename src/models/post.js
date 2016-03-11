'use strict';

/*
* Collection of posts
*/
module.exports = (mongoose) => {

  let Schema = mongoose.Schema;

  let PostSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "user" },
    blog_id: { type: Schema.ObjectId, ref: "blog" },
    title: {type: String, required: true},
    state: { type: String, options: 'draft, published, archived', default: 'draft'},
    published_date: { type: Date, default: Date.now, dependsOn: { state: 'published' } },
    content: { type: String, required: true }
  }, { collection:'post' });
  return mongoose.model('post', PostSchema);
}
