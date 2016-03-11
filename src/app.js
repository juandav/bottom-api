'use strict';
/*
* Module dependencies
*/
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bills from 'bills';
import * as model from '../src/middleware/models';
import cors from 'cors';

const app = express();
const router = JSON.parse(fs.readFileSync(__dirname + '/router.json').toString());

/*
* Middleware
*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(model.default);
app.use(morgan('dev'));
bills(app, router);

app.listen(7000, '127.0.0.1', function() {
  console.log('server run!');
});
