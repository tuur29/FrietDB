let mongoose = require('mongoose');
let crypto = require('crypto');
require('dotenv').config();

let Edit = require('../../models/edit');
let Shop = require('../../models/shop');
let Snack = require('../../models/snack');
let User = require('../../models/user');

function database() {}

let conn = mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true, promiseLibrary: require('bluebird') }, function(err) {
  if (err) console.log("Cannot connect to MongoDB instance");
});

database.fill = function(callback) {

  let cred = generateNewCred();

  Promise.all([

    // add users
    new Promise(function(resolve, reject) {
      User.collection.insertMany([
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d14'), name: 'Admin', email: 'admin@domain.com', hash: cred.hash, salt: cred.salt, admin: true, status: 'ACTIVE' },
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d15'), name: 'New User', email: 'newuser@domain.com', hash: cred.hash, salt: cred.salt },
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d16'), name: 'Old User', email: 'olduser@domain.com', hash: cred.hash, salt: cred.salt, status: 'ACTIVE' }
      ], () => { resolve(); })
    }),

    // add snacks
    new Promise(function(resolve, reject) {
      Snack.collection.insertMany([
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d17'), name: 'Bitterballen', type: 'Snacks', image: 'http://site.com/bitterballen.jpg', site: 'http://site.com/', usage: 7 },
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d18'), name: 'Kipknots', type: 'Snacks', site: 'http://site.com/', usage: 10 },
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d19'), name: 'Kaaskroket', type: 'Snacks', vegi: true, usage: 5 },
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d1a'), name: 'Bicky burger', type: 'Burgers', usage: 3 },
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d1b'), name: 'Bicky burger vegi', type: 'Burgers', vegi: true, image: 'http://site.com/bickyvegi.jpg', usage: 1 },
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d1c'), name: 'Speciaal', type: 'Andere' }
       ], () => { resolve(); })
    }),

    // add shops
    new Promise(function(resolve, reject) {
      Shop.collection.insertMany([
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d1d'), name: 'Frituur Nadine', image: 'http://site.com/nadine.jpg', description: 'openingsuren', street: 'Vlaanderenstraat', number: '543', municipality: 'Gent', telephone: '01/234.56.78', website: 'http://site.com/', lat: 23.5884, lng: 18.4828, snacks: [
          mongoose.Types.ObjectId('5a25ac5d0feeef4258064d17'),
          mongoose.Types.ObjectId('5a25ac5d0feeef4258064d1a'),
          mongoose.Types.ObjectId('5a25ac5d0feeef4258064d1b')
        ]},
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d1e'), name: 'Frietshop', street: 'Walloniestraat', number: '234', municipality: 'Destelbergen', email: 'frietshop@domain.com', vegi: 'goed frituurvet :)', lat: 62.7429, lng: 73.1283, snacks: [
          mongoose.Types.ObjectId('5a25ac5d0feeef4258064d1c')
        ]},
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d1f'), name: 'De Punt', image: 'http://site.com/punt.jpg', street: 'Brusselsdreef', number: '2', municipality: 'Merelbeke', telephone: '01/234.56.78', email: 'punt@domain.com', lat: 6.5816, lng: 19.8548, snacks: [
          mongoose.Types.ObjectId('5a25ac5d0feeef4258064d19'),
          mongoose.Types.ObjectId('5a25ac5d0feeef4258064d17'),
          mongoose.Types.ObjectId('5a25ac5d0feeef4258064d18')
        ]}
       ], () => { resolve(); })
    }),

    // add proposed edits
    // TODO: add edit data
    new Promise(function(resolve, reject) {
      Edit.collection.insertMany([
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d20'), timestamp: 1510516146, type: 'Snack', user: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d16'), item: {
          name: 'e1'
        }},
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d21'), timestamp: 1511742734, type: 'Snack', user: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d16'), item: {
          name: 'e2'
        }},
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d22'), timestamp: 1512032877, type: 'Snack', user: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d16'), item: {
          name: 'e3'
        }},
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d23'), timestamp: 1512411791, type: 'Snack', user: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d16'), item: {
          name: 'e4'
        }},
        { _id: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d24'), timestamp: 1512414266, type: 'Snack', user: mongoose.Types.ObjectId('5a25ac5d0feeef4258064d16'), item: {
          name: 'e5'
        }}
       ], () => { resolve(); })
    }),

  ]).then(() => {
    callback();
  })

};

database.dump = function(callback) {

  Promise.all([
    new Promise(function(resolve, reject) {
      Edit.collection.drop(() => { resolve() })
    }),
    new Promise(function(resolve, reject) {
      Shop.collection.drop(() => { resolve() })
    }),
    new Promise(function(resolve, reject) {
      Snack.collection.drop(() => { resolve() })
    }),
    new Promise(function(resolve, reject) {
      User.collection.drop(() => { resolve() })
    })

  ]).then(() => {
    mongoose.connection.close();
    callback();
  })
};

function generateNewCred() {
  let password = "qwerty12345";
  let salt = crypto.randomBytes(32).toString('hex');
  return {
    salt: salt, 
    hash: crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  };
}

module.exports = database;
