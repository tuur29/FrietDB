let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// TODO: link edit.item to Snacks / Shop model?

const EditSchema = new Schema({
	id: { type: Number, unique: true, required: true },
	timestamp: { type: Number, required: true },
    type: { type: String, required: true },
    item: {
    	id: Number,
    	name: String
    },
    user: {
    	id: Number,
    	name: String
    }
});

module.exports = mongoose.model('Edit', EditSchema);
