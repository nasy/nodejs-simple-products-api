var chai = require('chai');
var expect = chai.expect;
var stockSerializer = require('./../../../serializer/stockSerializer');
describe('stockSerializer', function() {
  it('serializeStock should return an array', function() {
    var response = stockSerializer.serializeStock(1, 2)
    .then((stock) => {
      expect(stock.cost).to.equal(2);
      expect(stock.price).to.equal(1);
    })
    .catch(error => {
      expect(true).to.equal(false);
    });
  });
});
