let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let User = require('./models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (email, password, done) {
	User.findOne({ email: email }, function (err, user) {
		if (err) return done(err);

		if (!user)
			return done(null, false, { message: 'Incorrect email.' });

		if (!user.validPassword(password))
			return done(null, false, { message: 'Incorrect password.' });
		
		return done(null, user);
	});
}));
