let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// setup db
mongoose.connect('mongodb://localhost/frietdb',{ useMongoClient: true }, function(err) {
  if (err) throw new Error("Cannot connect to MongoDB instance");

  let admin = new mongoose.mongo.Admin(mongoose.connection.db);
  admin.buildInfo((err, info) => { console.log("MongoDB version " + info.version) });
});

// check if server online
router.get('/api', function(req, res, next) {
  res.json({ status: 200 });
});

// temp route
let itemSchema = mongoose.Schema({
    data: String
});
let Item = mongoose.model('Items', itemSchema, 'Item');

router.get('/api/items', function(req, res, next) {

  Item.find({}, function (err,items) {
    if (err) next(err);
    res.json({ data: items.map((i) => { return i.data }) });
  });

});

module.exports = router;
