let express = require('express');
let mongoose = require('mongoose');
let Edit = require('../models/edit');
let Shop = require('../models/shop');
let Snack = require('../models/snack');
let editRouter = express.Router();

// TODO: Add user validation

let handleGetAll = function(type, request, response) {
    Edit.find({ type: type }).sort([['timestamp', -1]]).exec(function(error, edits) {
        if (error) {
            response.status(500).send(error);
            return;
        }
        let subsettededits = edits.map(function(e) {
            return {
                id: e._id,
                timestamp: e.timestamp,
                item: e.item.name,
                user: e.user.name
            };
        })
        response.json(subsettededits);
    });
}
editRouter.route('/shops').get(function(req,res) { handleGetAll('shop',req,res) });
editRouter.route('/snacks').get(function(req,res) { handleGetAll('snack',req,res) });

editRouter.route('/:editId')
    .get(function(request, response) {
        Edit.findOne({
            _id: request.params.editId
        }, function(error, edit) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            if (edit.type == 'shop') {
                Snack.find({ _id: { $in : edit.item.snacks } }, function(error, snacks) {
                    if (error) {
                        response.status(500).send(error);
                        return;
                    }
                    edit.item.snacks = snacks;
                    response.json(edit);
                });
            } else {
                response.json(edit);
            }
        });
    });

// toggle destructive routes
if (true) {
// if (false) {

    // make new edit
    editRouter.route('/')
        .put(function(request,response){
            let item = request.body.item;
            if (item.id) delete item.id;
            if (item.__v) delete item.__v;

            if (request.body.type == "snack" && !item._id)
                item._id = mongoose.Types.ObjectId();

            let edit = new Edit({
                type: request.body.type,
                item: item,
                user: { name: "Tuur" }
            });
            edit.save(function (error, results) {
                if (error) {
                    response.status(500).send(error);
                    return;
                }
                edit.item.id = edit.item._id;
                response.json(edit);
            });
        });

    editRouter.route('/:editId')
        // accept & save edit to Snack/Shop
        .post(function(request,response) {

            Edit.findOne({
                _id: request.params.editId
            }, function(error, edit) {
                if (error) {
                    response.status(500).send(error);
                    return;
                }

                if (edit.type == "shop") {

                    let shop = new Shop(edit.item);
                    if (edit.item._id) shop.isNew = false;
                    shop.save(function (error, results) {
                        if (error) {
                            response.status(500).send(error);
                            return;
                        }
                        edit.remove();
                        response.json(shop);
                    });
                } else if (edit.type == "snack") {
                    let snack = new Snack(edit.item);
                    // TODO: Better way to check is snack is new
                    if (edit.item._id) snack.isNew = false;
                    snack.save(function (error, results) {
                        if (error) {
                            response.status(500).send(error);
                            return;
                        }
                        edit.remove();
                        response.json(snack);
                    });
                }
            });
        })

        // reject edit
        .delete(function(request,response){

            Edit.findOne({
                _id: request.params.editId
            }, function(error, edit) {
                if (error) {
                    response.status(500).send(error);
                    return;
                }
                edit.remove();
                response.json({status: 200});
            });
        });

}

module.exports = editRouter;
