const mongoose = require('mongoose');

const { Schema } = mongoose;

const StallProduct = require ('./StallProduct')

const stallSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        min: 0,
        default: 0
    },
    image: {
        type: String,
        default: 'pams-stall.jpg'
    },
    description: {
        type: String,
    },
    products: [StallProduct.schema]
});

const Stall = mongoose.model('Stall', stallSchema);

module.exports = Stall;
