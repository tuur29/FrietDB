let express = require('express');
let mongoose = require('mongoose');
let Shop = require('../models/shop');
let shopRouter = express.Router();

shopRouter.route('/')
    .get(function(request, response) {
        Shop.find(function(error, shops) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            let subsettedshops = shops.map(function(s) {
                return {
                    id: s._id,
                    name: s.name,
                    street: s.street,
                    municipality: s.municipality,
                    lat:s.lat,
                    lng:s.lng
                };
            })
            response.json(subsettedshops);
        });
    })

    // find shops based on snack offering
    .post(function(request,response) {
        Shop.find({ snacks: {
            $in: JSON.parse(request.body.snacks).map( (elem) => {
                return mongoose.Types.ObjectId(elem);
            })
         }}, function(error, shops) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            let subsettedshops = shops.map(function(s) {
                return {
                    id: s._id,
                    name: s.name,
                    street: s.street,
                    municipality: s.municipality,
                    lat:s.lat,
                    lng:s.lng
                };
            })
            response.json(subsettedshops);
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
    });

module.exports = shopRouter;
