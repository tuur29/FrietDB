let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const EditSchema = new Schema({
	timestamp: { type: Number, default: Math.round( Date.now()/1000) },
    type: { type: String, required: true },
    item: Schema.Types.Mixed,
    user: {
    	name: String
    }
});

EditSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Edit', EditSchema);
