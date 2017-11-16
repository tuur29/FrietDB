let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const EditSchema = new Schema({
	timestamp: { type: Number, required: true },
    type: { type: String, required: true },
    item: Schema.Types.Mixed,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

EditSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Edit', EditSchema);
