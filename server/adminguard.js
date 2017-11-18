let jwt = require('express-jwt');

let authadmin = function (req, res, next) {
    if (!req.user.admin)
        return response.status(403).send("Deze account heeft geen adminrechten");
    else
        next();
};

module.exports = authadmin;
