var productModel = require('./../models/productModel');
function productService(){

}
productService.prototype.getProducts = function(){
  return new Promise((resolve, reject) => {
    productModel.find({}, function(err, products) {
      if(err){
        return reject(err);
      }else {
        return resolve(products);
      }
    });
  });
}
productService.prototype.createProduct = function(
  description,
  cost,
  price,
  stock
){
  return new Promise((resolve, reject) => {
    var product = new productModel();
    product.description = description;
    product.cost = cost;
    product.price = price;
    product.stock = stock;
    product.total_price = (price && stock) ? price*stock : 0;
    product.total_cost = (cost && stock) ? cost*stock : 0;
    product.save(function(err) {
      if(err){
        return reject(err);
      }else {
        return resolve(product);
      }
    });
  });
}
productService.prototype.getProduct = function(productId){
  return new Promise((resolve, reject) => {
    productModel.findById(productId, function (err, product) {
      if(err){
        return reject(err);
      }else {
        return resolve(product);
      }
    });
  });
}
productService.prototype.updateProduct = function(
  productId,
  description,
  cost,
  price,
  stock
){
  return new Promise((resolve, reject) => {
    productModel.findById(productId, function (err, product) {
      if(err){
        return result(err);
      }else {
        product.description = description;
        product.cost = cost;
        product.price = price;
        product.stock = stock;
        product.total_price = (price && stock) ? price*stock : 0;
        product.total_cost = (cost && stock) ? cost*stock : 0;
        product.save(function(err) {
          if(err){
            return reject(err);
          }else {
            return resolve(product);
          }
        });
      }
    });
  });
}
productService.prototype.deleteProduct = function(productId){
  return new Promise((resolve, reject) => {
    productModel.remove({ _id: productId }).exec()
    .then(response => {
      return resolve();
    })
    .catch(err => {
      return reject(err);
    });
  });
}
productService.prototype.getStock = function(){
  return new Promise((resolve, reject) => {
    productModel.aggregate([{
      $match : {},
    },{
        $group : {
            _id : null,
            cost : {
                $sum : "$total_cost"
            },
            price : {
                $sum : "$total_price"
            }
        }
    }], function (err, stock) {
      if(err){
        return reject(err);
      }else {
        return resolve(stock[0]);
      }
    });
  });
}
module.exports = new productService();
