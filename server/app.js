let compression = require('compression')
let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');

require('dotenv').config()
require('./passport');

let shopRouter = require('./routers/shop');
let snackRouter = require('./routers/snack');
let editRouter = require('./routers/edit');
let userRouter = require('./routers/user');

// TODO: Send mails when user registered/activated, edit posted/accepted

// setup
let app = express();
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
app.use(cookieParser());
app.use(passport.initialize());

// connecting & load routes
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true, promiseLibrary: require('bluebird') }, function(err) {
  if (err) throw new Error("Cannot connect to MongoDB instance");
  let admin = new mongoose.mongo.Admin(mongoose.connection.db);
  admin.buildInfo((err, info) => { console.log("MongoDB version " + info.version) });
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});

// allow cors from production domain
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_DOMAIN);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, *");
  next();
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
app.use('/api/users', userRouter);

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({status: (err.status || 500), message: err.message});
});


module.exports = app;
