var request = require('request');
var currencyConverterService = require('./../service/currencyConverterService');
function productSerializer(){

}
productSerializer.prototype.serializeProduct = function(productModel, currency){
  return new Promise((resolve, reject) => {
    currency = (currency) ? currency.toUpperCase() : 'USD';
    currencyConverterService.getExchangeRate(currency)
    .then((exchangeRate) => {
      return resolve(serialize(productModel, exchangeRate, currency));
    })
    .catch(error => {
      return reject(error);
    });
  });
}
productSerializer.prototype.serializeProducts = function(productModels, currency){
  return new Promise((resolve, reject) => {
    currency = (currency) ? currency.toUpperCase() : 'USD';
    currencyConverterService.getExchangeRate(currency)
    .then((exchangeRate) => {
      var products = [];
      productModels.forEach(productModel => {
        products.push(serialize(productModel, exchangeRate, currency));
      });
      return resolve(products);
    })
    .catch(error => {
      console.log(error)
      return reject(error);
    });
  });
}
function serialize(productModel, exchangeRate, currency){
  var finalCost = productModel.cost * exchangeRate;
  var finalPrice = productModel.price * exchangeRate;
  var finalTotalPrice = productModel.total_price * exchangeRate;
  var finalTotalCost = productModel.total_cost * exchangeRate;
  return {
    id : productModel.id,
    description : productModel.description,
    cost : finalCost,
    price : finalPrice,
    currency : currency,
    stock : productModel.stock,
    total_price : finalTotalPrice,
    total_cost : finalTotalCost
  }
}
module.exports = new productSerializer();
