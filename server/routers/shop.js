let express = require('express');
let mongoose = require('mongoose');
let Shop = require('../models/shop');
let shopRouter = express.Router();

let jwt = require('express-jwt');
let auth = jwt({secret: process.env.JWT_SECRET, userProperty: 'user'});
let authadmin = require('../adminguard');

let subsetShops = function(shops) {
    return shops.map(function(s) {
        return {
            id: s._id,
            name: s.name,
            street: s.street,
            municipality: s.municipality,
            vegi: s.vegi,
            lat:s.lat,
            lng:s.lng
        };
    });
}

shopRouter.route('/')
    .get(function(request, response) {
        Shop.find({}).sort([['name',1]]).exec(function(error, shops) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(subsetShops(shops));
        });
    })

    // find shops based on snack offering
    .post(function(request,response) {
        Shop.find({ snacks: {
            $all: JSON.parse(request.body.snacks).map( (elem) => {
                return mongoose.Types.ObjectId(elem);
            })
         }}, function(error, shops) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(subsetShops(shops));
        });
    });

shopRouter.route('/:shopId')
    .get(function(request, response) {
        Shop.findOne({
            _id: request.params.shopId
        }).populate('snacks').exec(function(error, shop) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(shop);
        });
    })

    .delete(auth, authadmin, function(request,response){
        Shop.findOne({
            _id: request.params.shopId
        }, function(error, shop) {
            if (error || shop==null) {
                response.status(500).send(error || null);
                return;
            }
            shop.remove();
            response.json({status: 200});
        });
    });

module.exports = shopRouter;
