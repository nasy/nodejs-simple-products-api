var config = require('./../config');
var currencyConverterService = require('./../service/currencyConverterService');
function stockSerializer(){

}
stockSerializer.prototype.serializeStock = function(price, cost, currency){
  return new Promise((resolve, reject) => {
    var currency = (currency) ? currency.toUpperCase() : 'USD';
    currencyConverterService.getExchangeRate(currency)
    .then((exchangeRate) => {
      return resolve(serialize(price, cost, exchangeRate, currency));
    })
    .catch(error => {
      return reject(error);
    });
  });
}
function serialize(price, cost, exchangeRate, currency){
  var finalTotalPrice = price * exchangeRate;
  var finalTotalCost = cost * exchangeRate;
  return {
    price : finalTotalPrice,
    cost : finalTotalCost,
    currency : currency
  }
}
module.exports = new stockSerializer();
