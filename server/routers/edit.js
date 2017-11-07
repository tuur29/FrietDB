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

// get pendingsnacks
let getPendingSnacks = function(snackIds, request, response, action = "query") {
    Edit.find({
        type: 'snack'
    }, function(error, snacks) {
        if (error) {
            response.status(500).send(error);
            return;
        }
        try {
            let pending = snacks.filter((snack) =>
                snack.item.hasOwnProperty('_id') &&
                snackIds.indexOf(snack.item._id.toString()) > -1
            );
            if (action == "remove")
                pending.forEach((snack) => snack.remove());
            else
                response.json(pending);
        } catch (e) {
            response.status(500).send(e);
        }
    });
}

// get all pending snacks of shop
editRouter.route('/snacks/:shopId')
    .get(function(request, response) {
        Edit.findOne({
            _id: request.params.shopId,
            type: 'shop'
        }, function(error, edit) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            getPendingSnacks(edit.item.snacks, request, response);
        });
    });

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

    // remove edit by item id
    editRouter.route('/snack/:snackId')
        .delete(function(request,response){
            Edit.find({
                type: 'snack'
            }, function(error, edits) {
                if (error) {
                    response.status(500).send(error);
                    return;
                }

                for (var i = 0; i < edits.length; i++) {
                    if (edits[i].item._id == request.params.snackId) {
                        edits[i].remove();
                        break;
                    }
                }

                response.json({status: 200});
            });
        });

    // make new edit
    editRouter.route('/')
        .put(function(request,response){
            try {
                let item = request.body.item;
                if (item.id) delete item.id;
                if (item.__v) delete item.__v;

                if (request.body.type == "snack" && !item._id)
                    item._id = mongoose.Types.ObjectId();

                let edit = new Edit({
                    timestamp: Math.round(new Date().getTime() /1000),
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
            } catch (e) {
                response.status(500).send(e);
            }
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

                try {

                    if (edit.type == "shop") {
                        // strip snack ids that don't exist
                        Snack.find({ _id: { $in: edit.item.snacks } }, function(err, snacks) {
                            // remove shopedit
                            let shop = new Shop(edit.item);
                            shop.snacks = snacks.map((snack) => snack._id);
                            if (edit.item._id) shop.isNew = false;
                            shop.save(function (error, results) {
                                if (error) {
                                    response.status(500).send(error);
                                    return;
                                }
                                getPendingSnacks(edit.item.snacks,request,response,"remove");
                                edit.remove();
                                response.json(shop);
                            });
                        });
                    } else if (edit.type == "snack") {

                        Snack.count({ _id: edit.item._id }, function(err, count) {
                            let snack = new Snack(edit.item);
                            if (count > 0) snack.isNew = false;
                            snack.save(function (error, results) {
                                if (error) {
                                    response.status(500).send(error);
                                    return;
                                }
                                edit.remove();
                                response.json(snack);
                            });
                        });
                    }
                    
                } catch (e) {
                    response.status(500).send(e);
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

                if (edit.type == "shop")
                    getPendingSnacks(edit.item.snacks,request,response,"remove");

                edit.remove();
                response.json({status: 200});
            });
        });

}

module.exports = editRouter;
