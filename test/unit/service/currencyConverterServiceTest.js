var chai = require('chai');
var expect = chai.expect;
var currencyConverterService = require('./../../../service/currencyConverterService');
describe('currencyConverterService', function() {
  it('USD should return 1', function() {
    var response = currencyConverterService.getExchangeRate('USD')
    .then((result) => {
      expect(result).to.equal(1);
    })
    .catch(error => {
      expect(true).to.equal(false);
    });
  });
  it('EUR should return integer', function() {
    var response = currencyConverterService.getExchangeRate('EUR')
    .then((result) => {
      expect(result).to.above(0);
    })
    .catch(error => {
      expect(true).to.equal(false);
    });
  });
});
