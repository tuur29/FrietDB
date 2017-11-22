let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const SnackSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    vegi: { type: Boolean, default: false },
    image: String,
    link: String,
    usage: {type: Number, default: 0}
});

SnackSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Snack', SnackSchema);
