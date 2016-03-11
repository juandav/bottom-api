'use strict';
import { MongoClient } from 'mongodb';
import exec            from 'sync-exec';

export let importDB = (req, res, next) => {
  console.log('import data');
}

export let exportDB = (req, res, next) => {

  MongoClient.connect('mongodb://127.0.0.1:27017/cms', function(err, db) {
    if(err) throw err;

    db.collections(function(err, collections) {

      let array_data = collections.map(getCollection);
      let export_data = [];

      array_data.forEach(function(element){
        let data = {
          collection : element,
          data: exec('mongoexport -d cms -c ' + element + ' --pretty').stdout
        }
        export_data.push(data);
      });

      res.status(200).send(export_data);
    });

  });

}

let getCollection = (element) => {
  return element.s.name;
}

/*
  mongoimport --collection Newimport --file filename.json
  mongoexport --db test --collection CollectionName --out outputFileName.json
*/
