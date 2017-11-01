let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const SnackSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    image: String,
    link: String,
});

SnackSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Snack', SnackSchema);
