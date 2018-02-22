function currencyConverterService(){

}
currencyConverterService.prototype.getExchangeRate = function(currency){
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
module.exports = new currencyConverterService();
