let express = require('express');
let Snack = require('../models/snack');
let snackRouter = express.Router();

snackRouter.route('/')
    .get(function(request, response) {
        Snack.find({}).sort([['usage', -1]]).exec(function(error, snacks) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            let subsettedsnacks = snacks.map(function(s) {
                return {
                    id: s._id,
                    name: s.name,
                    usage: s.usage,
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
            _id: snackId
        }, function(error, snack) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(snack);
        });
    })

    .post(function(request, response) {
        let snackId = request.params.snackId;
        Snack.findOne({
            _id: snackId
        }, function(error, snack) {
            if (error || snack==null) {
                response.status(500).send(error || null);
                return;
            }
            snack.usage++;
            snack.save();
            response.json(snack);
        });
    });

module.exports = snackRouter;
