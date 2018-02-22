var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productModel = new Schema({
    description: String,
    cost: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    total_cost: { type: Number, default: 0 },
    total_price: { type: Number, default: 0 }
});
module.exports = mongoose.model('productModel', productModel);
