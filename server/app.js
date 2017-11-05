let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let shopRouter = require('./routers/shop');
let snackRouter = require('./routers/snack');
let editRouter = require('./routers/edit');

// TODO: add prod & test env
// TODO: never crash server

// config
const HOST_NAME = 'localhost';
const DATABASE_NAME = 'frietdb';

// setup
let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// connecting & load routes
mongoose.connect('mongodb://'+HOST_NAME+'/'+DATABASE_NAME, { useMongoClient: true }, function(err) {
  if (err) throw new Error("Cannot connect to MongoDB instance");
  let admin = new mongoose.mongo.Admin(mongoose.connection.db);
  admin.buildInfo((err, info) => { console.log("MongoDB version " + info.version) });
});

// default route to check online
let router = express.Router();
router.get('/', function(req, res, next) {
  res.json({ status: 200 });
});
app.use('/api', router);

// load routes
app.use('/api/shops', shopRouter);
app.use('/api/snacks', snackRouter);
app.use('/api/edits', editRouter);

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({status: (err.status || 500), message: err.message});
});


module.exports = app;
