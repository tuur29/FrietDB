let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// TODO: link shop.snack to Snacks model

const ShopSchema = new Schema({
	id: { type: Number, unique: true, required: true },
	name: { type: String, required: true },
	image: String,
	description: String,
	street: { type: String, required: true },
	number: { type: Number, required: true },
	municipality: { type: String, required: true },
	telephone: String,
	email: String,
	website: String,
	lat: { type: Number, required: true },
	lng: { type: Number, required: true },
	snacks: [Schema.ObjectId],
});

module.exports = mongoose.model('Shop', ShopSchema);
