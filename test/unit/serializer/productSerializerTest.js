var chai = require('chai');
var expect = chai.expect;
var productSerializer = require('./../../../serializer/productSerializer');

describe('productSerializer', function() {
  it('serializeProduct should return an array', function() {
    var product = {};
    product.description = 'Test';
    product.cost = 2;
    product.price = 1;
    product.stock = 1;
    product.total_price = 1;
    product.total_cost = 2;
    var response = productSerializer.serializeProduct(product)
    .then((product) => {
      expect(product.description).to.equal('Test');
      expect(product.cost).to.equal(2);
      expect(product.price).to.equal(1);
      expect(product.stock).to.equal(1);
      expect(product.total_price).to.equal(1);
      expect(product.total_cost).to.equal(2);
    })
    .catch(error => {
      expect(true).to.equal(false);
    });
  });
  it('serializeProducts should return an array of products', function() {
    var product = {};
    product.description = 'Test';
    product.cost = 2;
    product.price = 1;
    product.stock = 1;
    product.total_price = 1;
    product.total_cost = 2;
    var response = productSerializer.serializeProduct([product])
    .then((products) => {
      products.forEach(product => {
        expect(product.description).to.equal('Test');
        expect(product.cost).to.equal(2);
        expect(product.price).to.equal(1);
        expect(product.stock).to.equal(1);
        expect(product.total_price).to.equal(1);
        expect(product.total_cost).to.equal(2);
      });
    })
    .catch(error => {
      expect(true).to.equal(false);
    });
  });
});
