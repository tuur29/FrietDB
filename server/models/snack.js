let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const SnackSchema = new Schema({
	id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    image: String,
    link: String,
});

module.exports = mongoose.model('Snack', SnackSchema);
