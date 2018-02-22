var app = require('express');
var router = app.Router();
var productRouter = app.Router({mergeParams: true});
var productService = require('./../service/productService');
var apiResponseService = require('./../service/apiResponseService');
var productSerializer = require('./../serializer/productSerializer');
productRouter.get('/products', function (req, res){
  productService.getProducts()
  .then((productModels) => {
    productSerializer.serializeProducts(productModels, req.query.currency)
    .then((products) => {
      res.send(apiResponseService.success(products));
    })
    .catch(error => {
      res.send(apiResponseService.error(error));
    });
  })
  .catch(error => {
    res.send(apiResponseService.error(error));
  });
});
productRouter.get('/products/:product_id', function (req, res){
  productService.getProduct(req.params.product_id)
  .then((productModel) => {
    productSerializer.serializeProduct(productModel, req.query.currency)
    .then((product) => {
      res.send(apiResponseService.success(product));
    })
    .catch(error => {
      res.send(apiResponseService.error(error));
    });
  })
  .catch(error => {
    res.send(apiResponseService.error(error));
  });
});
productRouter.post('/products', function (req, res){
  productService.createProduct(
    req.body.description,
    req.body.cost,
    req.body.price,
    req.body.stock
  )
  .then((productModel) => {
    res.send(apiResponseService.success());
  })
  .catch(error => {
    res.send(apiResponseService.error(error));
  });
});
productRouter.put('/products/:product_id', function (req, res){
  productService.updateProduct(
    req.params.product_id,
    req.body.description,
    req.body.cost,
    req.body.price,
    req.body.stock
  )
  .then((productModel) => {
    res.send(apiResponseService.success());
  })
  .catch(error => {
    res.send(apiResponseService.error(error));
  });
});
productRouter.delete('/products/:product_id', function (req, res){
  productService.deleteProduct(req.params.product_id)
  .then(() => {
    res.send(apiResponseService.success());
  })
  .catch(error => {
    res.send(apiResponseService.error(error));
  });
});
router.use('/', productRouter);
module.exports = productRouter;
