let express = require('express');
let Shop = require('../models/shop');
let shopRouter = express.Router();

// TODO: Add snacks to shop schema
// TODO: Add get route for all possible shops with send snacks

shopRouter.route('/')
    .get(function(request, response) {
        Shop.find(function(error, shops) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            let subsettedshops = shops.map(function(s) {
                return {
                    id: s.id,
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
        let shopId = request.params.shopId;
        Shop.findOne({
            id: shopId
        }, function(error, shop) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(shop);
        });
    });

module.exports = shopRouter;
