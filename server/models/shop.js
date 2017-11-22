let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ShopSchema = new Schema({
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
	vegi: { type: String, default: "" },
	snacks: [{ type: Schema.Types.ObjectId, ref: 'Snack' }]
});

ShopSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Shop', ShopSchema);
