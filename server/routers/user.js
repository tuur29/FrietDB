let express = require('express');
let User = require('../models/user');
let userRouter = express.Router();

let passport = require('passport');
require('../passport');

let jwt = require('express-jwt');
let auth = jwt({secret: process.env.JWT_SECRET, userProperty: 'user'});
let authadmin = require('../adminguard');

userRouter.route('/login')
    .post(function(req, res, next){
        if ( !req.body.email || !req.body.password )
            return res.status(400).json({message: 'Please fill out all fields'});

        passport.authenticate('local', function(error, user, info){
            if (error) return next(error);

            if (user)
                return res.json({token: user.generateJWT()});
            else
                return res.status(401).json(info);
        })(req, res, next);
  });

userRouter.route('/register')
    .post(function(req, res, next){
        if ( !req.body.name || !req.body.email || !req.body.password )
            return res.status(400).json({message: 'Please fill out all fields'});

        let user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.setPassword(req.body.password)

        user.save(function (error){
            if (error) {
                res.status(500).send(error.errmsg);
                return;
            }
            return res.send({status: 200});
        });
  });

userRouter.route('/:userId')
    .post(auth, authadmin, function(request, response) {
        let userId = request.params.userId;
        User.findOneAndUpdate({
            _id: userId,
            admin: false
        },{
            status: 'ACTIVE'
        }, {new: true}, function(error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(user);
        });
    })

    .delete(auth, authadmin, function(request, response) {
        let userId = request.params.userId;
        User.findOneAndUpdate({
            _id: userId,
            admin: false
        },{
            status: 'DISABLED'
        }, {new: true}, function(error, user) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(user);
        });
    });

let subsetUsers = function(users) {
    return users.map(function(u) {
        return {
            id: u._id,
            name: u.name,
            email: u.email,
            admin: u.admin,
            status: u.status
        };
    });
}

userRouter.route('/')
    .get(auth, authadmin, function(request, response) {
        User.find(function(error, users) {
            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(subsetUsers(users));
        });
    });

module.exports = userRouter;
