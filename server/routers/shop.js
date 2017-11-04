let express = require('express');
let mongoose = require('mongoose');
let Shop = require('../models/shop');
let shopRouter = express.Router();

let subsetShops = function(shops) {
    return shops.map(function(s) {
        return {
            id: s._id,
            name: s.name,
            street: s.street,
            municipality: s.municipality,
            lat:s.lat,
            lng:s.lng
        };
    });
}

shopRouter.route('/')
    .get(function(request, response) {
        Shop.find(function(error, shops) {
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

    // TODO: Add user validation
    .delete(function(request,response){
        Shop.findOne({
            _id: request.params.shopId
        }, function(error, shop) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            shop.remove();
            response.json({status: 200});
        });
    });

module.exports = shopRouter;
