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

// TODO: Add backend unit tests
// TODO: Add shopIds field to snack -> on shop remove: remove snack if shopIds < 2
// TODO: Use Mongoose .pre() instead of in router + dual link between snack & shop?

// setup
let app = express();
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// connecting & load routes
mongoose.connect('mongodb://'+process.env.HOST_NAME+'/'+process.env.DATABASE_NAME, { useMongoClient: true }, function(err) {
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
