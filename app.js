const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route');
const mongoose = require('mongoose');

let user = 'test_mongo';
let psw = 'test123';
const port = 8080;

let db_url = `mongodb://${user}:${psw}@ds163156.mlab.com:63156/products_db`;

let mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;//TODO:
let db = mongoose.connection;
db.on('error', () => console.log('error in connection to db'));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
app.listen(port, () => console.log('listen port', port))