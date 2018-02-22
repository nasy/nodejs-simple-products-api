var chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
let server = require('../../index');
var expect = chai.expect;
const uuidV4 = require('uuid/v4');
var productModel = require('./../../models/productModel');
describe('stocksRoute', function() {
  it('it should GET a stock', (done) => {
    productModel.remove({}, function(err) {
      var product = new productModel();
      product.description = 'Test';
      product.cost = 2;
      product.price = 1;
      product.stock = 1;
      product.total_price = 1;
      product.total_cost = 2;
      product.save(function(err) {
        if(!err){
          chai.request(server)
          .get('/stock')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.status('success');
              expect(res.body.data.cost).to.equal(2);
              expect(res.body.data.price).to.equal(1);
              done();
          });
        }else{
          expect(true).to.equal(false);
          done();
        }
      });
    });
  });
});
