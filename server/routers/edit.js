let express = require('express');
let Edit = require('../models/edit');
let editRouter = express.Router();

// TODO: Add post, put & delete options for one edit

editRouter.route('/shops')
    .get(function(request, response) {
        Edit.find({ type: 'shop' }, function(error, edits) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            let subsettededits = edits.map(function(e) {
                return {
                    id: e.id,
                    timestamp: e.timestamp,
                    item: e.item.name,
                    user: e.user.name
                };
            })
            response.json(subsettededits);
        });
    });


editRouter.route('/snacks')
    .get(function(request, response) {
        Edit.find({ type: 'snack' }, function(error, edits) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            let subsettededits = edits.map(function(e) {
                return {
                    id: e.id,
                    timestamp: e.timestamp,
                    item: e.item.name,
                    user: e.user.name
                };
            })
            response.json(subsettededits);
        });
    });

editRouter.route('/:editId')
    .get(function(request, response) {
        let editId = request.params.editId;
        Edit.findOne({
            id: editId
        }, function(error, edit) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(edit);
        });
    });

module.exports = editRouter;
