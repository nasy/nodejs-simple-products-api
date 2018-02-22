var chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
let server = require('../../index');
var expect = chai.expect;
const uuidV4 = require('uuid/v4');
var productModel = require('./../../models/productModel');
describe('productsRoute', function() {
  it('it should POST a product', (done) => {
    chai.request(server)
    .post('/products')
    .send({
      description : 'Test description',
      cost : 2,
      price : 3,
      stock : 4
    })
    .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.status('success');
        done();
    });
  });
  it('it should GET and return products', (done) => {
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
          .get('/products')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.status('success');
              res.body.data.forEach(product => {
                expect(product.description).to.equal('Test');
                expect(product.cost).to.equal(2);
                expect(product.price).to.equal(1);
                expect(product.stock).to.equal(1);
                expect(product.total_price).to.equal(1);
                expect(product.total_cost).to.equal(2);
              })
              done();
          });
        }else{
          expect(true).to.equal(false);
          done();
        }
      });
    });
  });
  it('it should GET and return products in eur', (done) => {
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
          .get('/products?currency=EUR')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.status('success');
              res.body.data.forEach(product => {
                expect(product.description).to.equal('Test');
              })
              done();
          });
        }else{
          expect(true).to.equal(false);
          done();
        }
      });
    });
  });
  it('it should GET a product', (done) => {
    productModel.remove({}, function(err) {
      var product = new productModel();
      product.description = 'Test description';
      product.cost = 2;
      product.price = 1;
      product.stock = 1;
      product.total_price = 1;
      product.total_cost = 2;
      product.save(function(err) {
        if(!err){
          chai.request(server)
          .get('/products/' + product._id)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.status('success');
              expect(res.body.data.cost).to.equal(2);
              expect(res.body.data.price).to.equal(1);
              expect(res.body.data.stock).to.equal(1);
              expect(res.body.data.total_price).to.equal(1);
              expect(res.body.data.total_cost).to.equal(2);
              expect(res.body.data.description).to.equal('Test description');
              done();
          });
        }else{
          expect(true).to.equal(false);
          done();
        }
      });
    });
  });
  it('it should GET a product in eur', (done) => {
    productModel.remove({}, function(err) {
      var product = new productModel();
      product.description = 'Test description';
      product.cost = 2;
      product.price = 1;
      product.stock = 1;
      product.total_price = 1;
      product.total_cost = 2;
      product.save(function(err) {
        if(!err){
          chai.request(server)
          .get('/products/' + product._id + '?currency=EUR')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.status('success');
              expect(res.body.data.cost).to.equal(2);
              expect(res.body.data.price).to.equal(1);
              expect(res.body.data.stock).to.equal(1);
              expect(res.body.data.total_price).to.equal(1);
              expect(res.body.data.total_cost).to.equal(2);
              expect(res.body.data.description).to.equal('Test description');
              done();
          });
        }else{
          expect(true).to.equal(false);
          done();
        }
      });
    });
  });
  it('it should PUT a product', (done) => {

    productModel.remove({}, function(err) {
      var product = new productModel();
      product.description = 'Test';
      product.cost = 4;
      product.price = 5;
      product.stock = 2;
      product.total_price = 1;
      product.total_cost = 2;
      product.save(function(err) {
        if(!err){
          chai.request(server)
          .put('/products/' + product._id)
          .send({
            description : 'Test description updated',
            cost : 4,
            price : 5,
            stock : 6
          })
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.status('success');
              done();
          });
        }else{
          expect(true).to.equal(false);
          done();
        }
      });
    });
  });
  it('it should DELETE a product', (done) => {
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
          .delete('/products/' + product._id)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.status('success');
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
