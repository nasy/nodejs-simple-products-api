var config = require('./../config');
var request = require('request');
function productSerializer(){

}
productSerializer.prototype.serializeProduct = function(productModel, currency){
  return new Promise((resolve, reject) => {
    var currency = (currency) ? currency.toUpperCase() : 'USD';
    getExchangeRate(currency)
    .then((exchangeRate) => {
      return resolve(serialize(productModel, exchangeRate, currency));
    })
    .catch(error => {
      return reject(null, error);
    });
  });
}
productSerializer.prototype.serializeProducts = function(productModels, currency){
  return new Promise((resolve, reject) => {
    var currency = (currency) ? currency.toUpperCase() : 'USD';
    getExchangeRate(currency)
    .then((exchangeRate) => {
      var products = [];
      productModels.forEach(productModel => {
        products.push(serialize(productModel, exchangeRate, currency));
      });
      return resolve(products);
    })
    .catch(error => {
      return reject(null, error);
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
function getExchangeRate(currency){
  return new Promise((resolve, reject) => {
    if(currency == "USD"){
      return resolve(1);
    }else{
      request({
         uri : config.currency_conversion_api,
         json : true,
         method : 'GET'
       }, (err, response, body) => {
         if(err){
           return reject('ERROR_RETRIEVING_THE_CURRENCY');
         } else {
           var currencyExists = false;
           var exchangeRate = null;
           for (responseCurrency in body.rates) {
             if(responseCurrency == currency){
               exchangeRate = body.rates[responseCurrency];
               currencyExists = true;
             }
           }
           if(!currencyExists){
             return reject('CURRENCY_NOT_FOUND');
           }else{
             return resolve(exchangeRate);
           }
         }
      });
    }
  });
}
module.exports = new productSerializer();
