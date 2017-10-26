let express = require('express');
let Snack = require('../models/snack');
let snackRouter = express.Router();

snackRouter.route('/')
    .get(function(request, response) {
        Snack.find(function(error, snacks) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            let subsettedsnacks = snacks.map(function(s) {
                return {
                    id: s.id,
                    name: s.name,
                    type: s.type
                };
            })
            response.json(subsettedsnacks);
        });
    });

snackRouter.route('/types')
    .get(function(request, response) {
        Snack.find().distinct('type', function(error, types) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(types);
        });
    });

snackRouter.route('/:snackId')
    .get(function(request, response) {
        let snackId = request.params.snackId;
        Snack.findOne({
            id: snackId
        }, function(error, snack) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(snack);
        });
    });

module.exports = snackRouter;
