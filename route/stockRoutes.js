var app = require('express');
var router = app.Router();
var stockRouter = app.Router({mergeParams: true});
var productService = require('./../service/productService');
var apiResponseService = require('./../service/apiResponseService');
var productSerializer = require('./../serializer/productSerializer');
stockRouter.get('/stock', function (req, res){
  productService.getStock()
  .then((stock) => {
    res.send(apiResponseService.success(stock));
  })
  .catch(error => {
    res.send(apiResponseService.error(error));
  });
});
router.use('/', stockRouter);
module.exports = stockRouter;
