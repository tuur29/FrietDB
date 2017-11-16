let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

const UserSchema = new Schema({
	name: String,
  status: { type: String, enum: ['ACTIVE','DISABLED'], default: 'DISABLED' },
	email: { type: String, lowercase: true, unique: true },
	admin: { type: Boolean, default: false },
	hash: String,
	salt: String
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(32).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function (password) {
	let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.isActive = function () {
  return this.status == 'ACTIVE';
};

UserSchema.methods.generateJWT = function () {
  let today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 30);
  return jwt.sign({
      id: this._id,
      email: this.email,
      admin: this.admin,
      exp: parseInt(exp.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', UserSchema);
