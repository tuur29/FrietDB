let express = require('express');
let User = require('../models/user');
let userRouter = express.Router();

let passport = require('passport');
require('../passport');

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
            return res.json({token: user.generateJWT()})
        });
  });

module.exports = userRouter;
