var app = require('express');
var router = app.Router();
var stockRouter = app.Router({mergeParams: true});
var productService = require('./../service/productService');
var apiResponseService = require('./../service/apiResponseService');
var stockSerializer = require('./../serializer/stockSerializer');
stockRouter.get('/stock', function (req, res){
  productService.getStock()
  .then((stock) => {
    stockSerializer.serializeStock(stock.price, stock.cost, req.query.currency)
    .then((stock) => {
      res.send(apiResponseService.success(stock));
    })
    .catch(error => {
      res.send(apiResponseService.error(error));
    });
  })
  .catch(error => {
    res.send(apiResponseService.error(error));
  });
});
router.use('/', stockRouter);
module.exports = stockRouter;
